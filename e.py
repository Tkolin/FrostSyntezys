import csv
import time
from elasticsearch import Elasticsearch
from tqdm import tqdm

# Подключение к Elasticsearch
es = Elasticsearch("http://31.129.110.55:52092")  # Укажи свой адрес сервера

# Индекс и поля для выгрузки
index = "candidates"
fields = ["position", "position_vector"]

# Получаем общее количество документов
total_docs = es.count(index=index)["count"]
print(f"Общее количество документов: {total_docs}")

# Начальный запрос с Scroll API
scroll_time = "5m"
page_size = 25000  # Количество документов за один запрос
response = es.search(
    index=index,
    scroll=scroll_time,
    size=page_size,
    _source=fields
)

# Открываем CSV-файл для записи
with open("output.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    
    # Записываем заголовки
    writer.writerow(fields)

    # Читаем первую порцию данных
    scroll_id = response["_scroll_id"]
    hits = response["hits"]["hits"]
    retrieved = 0

    # Полоса загрузки
    progress_bar = tqdm(total=total_docs, desc="Выгрузка данных", unit="docs")

    while hits:
        for hit in hits:
            row = [hit["_source"].get(field, "") for field in fields]

            # Проверка: если значение равно 0 или если это список, состоящий только из нулей, пропускаем запись
            skip = False
            for value in row:
                if value == 0:
                    skip = True
                    break
                if isinstance(value, list) and all(v == 0 for v in value):
                    skip = True
                    break

            if skip:
                progress_bar.update(1)
                continue

            writer.writerow(row)
            retrieved += 1
            progress_bar.update(1)

        # Запрашиваем следующую порцию данных
        response = es.scroll(scroll_id=scroll_id, scroll=scroll_time)
        scroll_id = response["_scroll_id"]
        hits = response["hits"]["hits"]

    progress_bar.close()

print("\n✅ Данные успешно сохранены в output.csv")

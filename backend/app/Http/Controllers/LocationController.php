<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Получить список всех локаций.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $locations = Location::all(); // Получаем все локации
        return response()->json($locations); // Возвращаем данные в формате JSON
    }

    /**
     * Создать новую локацию.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $location = Location::create($request->all()); // Создаём новую локацию
        return response()->json($location, 201); // Возвращаем созданную локацию
    }

    /**
     * Удалить локацию.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        \Log::info("Получен ID для удаления: " . $id);
        $location = Location::find((int) $id);
        

        if ($location) {
            $location->delete();
            return response()->json(['message' => 'Локация успешно удалена'], 200);
        } else {
            // Если локация не найдена, возвращаем ошибку
            return response()->json(['error' => 'Локация не найдена'], 404);
        }
    }
}
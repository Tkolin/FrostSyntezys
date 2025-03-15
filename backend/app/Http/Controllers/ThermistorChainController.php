<?php

namespace App\Http\Controllers;

use App\Models\ThermistorChain;
use Illuminate\Http\Request;

class ThermistorChainController extends Controller
{
    // Получить список всего оборудования
    public function index()
    {
        $thermistorChains = ThermistorChain::all();
        return response()->json($thermistorChains);
    }

    // Создать новое оборудование
    public function store(Request $request)
    {
        $data = $request->validate([
            'model' => 'required|string',
            'number' => 'nullable|string',
            'name' => 'nullable|string',
            // Добавьте другие поля, если нужно
        ]);

        $thermistorChain = ThermistorChain::create($data);
        return response()->json($thermistorChain, 201);
    }

    // Получить одно оборудование по ID
    public function show($id)
    {
        $thermistorChain = ThermistorChain::findOrFail($id);
        return response()->json($thermistorChain);
    }

    // Обновить оборудование
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'model' => 'sometimes|string',
            'number' => 'nullable|string',
            'name' => 'nullable|string',
            // Добавьте другие поля, если нужно
        ]);

        $thermistorChain = ThermistorChain::findOrFail($id);
        $thermistorChain->update($data);
        return response()->json($thermistorChain);
    }

    // Удалить оборудование
    public function destroy($id)
    {
        $thermistorChain = ThermistorChain::findOrFail($id);
        $thermistorChain->delete();
        return response()->json(null, 204);
    }
}
<?php

namespace App\Http\Requests\Torneos;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    { 
        return [
            'fk_user' => 'required|exists:users,id', 
            'nombreTorneo' => 'required|string|max:65535',
            'flayer' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'imgBannerSuperior' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'imgBannerInferiorIz' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'imgBannerInferiorDe' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'Aval' => 'nullable|string|max:65535',
            'ApoyoPrincipal' => 'nullable|string|max:65535',
            'cantidadGrupos' => 'required|integer|min:1',
            'cantidadEquiposParticipantes' => 'required|integer|min:2',
            'caracteristicas' => 'required|string|max:65535',
            'premiacion' => 'required|string|max:65535',
            'fk_sistema_juegos' => 'required|exists:sistema_juegos,id',
            'fk_categoria_equipo' => 'required|exists:categoria_equipo,id',
            'estadoTorneo' => 'required|in:Por Iniciar,En Juego,Finalizado',
            'inscripcion' => 'required|in:Abierta,Cerrada',
            'procesoInscripcion' => 'required|string|max:65535',
            'reglamentacion' => 'required|string|max:65535',
            'fechaInicio' => 'nullable|date',
            'fechaFin' => 'nullable|date', 
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'fk_user.required' => 'El usuario es obligatorio.',
            'fk_user.exists' => 'El usuario no existe.',
            'nombreTorneo.required' => 'El nombre del torneo es obligatorio.',
            'nombreTorneo.string' => 'El nombre del torneo debe ser una cadena de texto.',
            'nombreTorneo.max' => 'El nombre del torneo no puede exceder los 65535 caracteres.',
            'flayer.image' => 'El flayer debe ser una imagen.',
            'flayer.mimes' => 'El flayer debe ser una imagen de tipo: jpeg, png, jpg, gif, webp.',
            'flayer.max' => 'El flayer no puede exceder los 2048 kilobytes.',
            'imgBannerSuperior.image' => 'El banner superior debe ser una imagen.',
            'imgBannerSuperior.mimes' => 'El banner superior debe ser una imagen de tipo: jpeg, png, jpg, gif, webp.',
            'imgBannerSuperior.max' => 'El banner superior no puede exceder los 2048 kilobytes.',
            'imgBannerInferiorIz.image' => 'El banner inferior izquierdo debe ser una imagen.',
            'imgBannerInferiorIz.mimes' => 'El banner inferior izquierdo debe ser una imagen de tipo: jpeg, png, jpg, gif, webp.',
            'imgBannerInferiorIz.max' => 'El banner inferior izquierdo no puede exceder los 2048 kilobytes.',
            'imgBannerInferiorDe.image' => 'El banner inferior derecho debe ser una imagen.',
            'imgBannerInferiorDe.mimes' => 'El banner inferior derecho debe ser una imagen de tipo: jpeg, png, jpg, gif, webp.',
            'imgBannerInferiorDe.max' => 'El banner inferior derecho no puede exceder los 2048 kilobytes.',            
            'Aval.string' => 'El Aval debe ser una cadena de texto.',
            'Aval.max' => 'El Aval no puede exceder los 65535 caracteres.',
            'ApoyoPrincipal.string' => 'El Apoyo Principal debe ser una cadena de texto.',
            'ApoyoPrincipal.max' => 'El Apoyo Principal no puede exceder los 65535 caracteres.',
            'cantidadGrupos.required' => 'La cantidad de grupos es obligatoria.',
            'cantidadGrupos.integer' => 'La cantidad de grupos debe ser un número entero.',
            'cantidadGrupos.min' => 'La cantidad de grupos debe ser Mayor o igual a 1.',
            'cantidadEquiposParticipantes.required' => 'La cantidad de equipos participantes es obligatoria.',
            'cantidadEquiposParticipantes.integer' => 'La cantidad de equipos participantes debe ser un número entero.',
            'cantidadEquiposParticipantes.min' => 'La cantidad de equipos participantes debe ser Mayor o igual a 2.',            
            'caracteristicas.required' => 'Las características del torneo son obligatorias.',
            'caracteristicas.string' => 'Las características del torneo deben ser una cadena de texto.',
            'caracteristicas.max' => 'Las características del torneo no pueden exceder los 65535 caracteres.',
            'premiacion.required' => 'La premiación del torneo es obligatoria.',
            'premiacion.string' => 'La premiación del torneo debe ser una cadena de texto.',
            'premiacion.max' => 'La premiación del torneo no puede exceder los 65535 caracteres.',
            'fk_sistema_juegos.required' => 'El sistema de juego del torneo es obligatorio.',
            'fk_sistema_juegos.exists' => 'El sistema de juego no existe.',
            'fk_categoria_equipo.required' => 'La categoría de equipo es obligatoria.',
            'fk_categoria_equipo.exists' => 'La categoría de equipo no existe.',
            'estadoTorneo.required' => 'El estado del torneo es obligatorio.',
            'estadoTorneo.in' => 'El estado del torneo debe ser: Por Iniciar, En Juego, Finalizado.',
            'inscripcion.required' => 'El estado de inscripción del torneo es obligatorio.',
            'inscripcion.in' => 'El estado de inscripción del torneo debe ser: Abierta, Cerrada.',
            'procesoInscripcion.required' => 'El proceso de inscripción del torneo es obligatorio.',
            'procesoInscripcion.string' => 'El proceso de inscripción del torneo debe ser una cadena de texto.',
            'procesoInscripcion.max' => 'El proceso de inscripción del torneo no puede exceder los 65535 caracteres.',
            'reglamentacion.required' => 'La reglamentación del torneo es obligatoria.',
            'reglamentacion.string' => 'La reglamentación del torneo debe ser una cadena de texto.',
            'reglamentacion.max' => 'La reglamentación del torneo no puede exceder los 65535 caracteres.',
            'fechaInicio.date' => 'La fecha de inicio del torneo debe ser una fecha válida.',
            'fechaFin.date' => 'La fecha de fin del torneo debe ser una fecha válida.',

        ];
    }
}

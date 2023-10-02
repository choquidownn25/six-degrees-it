using Capa_de_Acceso_a_Datos.Modelss;

namespace Capa_de_Servicios.Models
{
    public class UsuarioModels : Usuario
    {
        public bool Success { get; set; } = true;
        public string? ErrorCode { get; set; } = null;
        public string? ErrorMessage { get; set; } = null;
    }
}

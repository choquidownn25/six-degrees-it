using Capa_de_Acceso_a_Datos.Modelss;
using Capa_de_Negocios.Repository;
using Capa_de_Servicios.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebApplicationSixDegreesIT.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
    public class UsuarioController : ControllerBase
    {
        private UsuarioRepository usuarioRepository;
        private readonly ILogger<UsuarioController> _logger;

        public UsuarioController(UsuarioRepository usuarioRepository, ILogger<UsuarioController> logger)
        {
            this.usuarioRepository = usuarioRepository;
            _logger = logger;
        }

        /// <summary>
        /// Metodo para mostrar dastos en la tabla Usuario
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpGet]
        public IEnumerable<Usuario> Get()
        {
           
            return usuarioRepository.GetAll().ToArray();
        }


        [HttpGet("/{id}")]
        public Usuario GetById(int id)
        {
           
            return usuarioRepository.GetById(id);
        }
        [HttpPost]
        public async Task<IActionResult> Add(UsuarioModels usuarioModels)
        {
            Usuario usuario= new Usuario();
            _logger.LogInformation("Add : " + usuarioModels);
            if (usuarioModels.Nombre == null || usuarioModels.Apellido==null)
            {
                return BadRequest(new UsuarioModels { Success = false, ErrorCode = "S01", ErrorMessage = "Invalid usuario request" });
            }
            usuario = usuarioRepository.Add(usuarioModels);
            return Ok(usuario);
        }
        [HttpPut]
        public async Task<IActionResult> Update( UsuarioModels usuarioModels)
        {
            Usuario usuario = new Usuario();
            _logger.LogInformation("Add : " + usuarioModels);
            if (usuarioModels.Nombre == null || usuarioModels.Apellido == null)
            {
                return BadRequest(new UsuarioModels { Success = false, ErrorCode = "S01", ErrorMessage = "Invalid usuario request" });
            }
            usuario = usuarioRepository.Modify(usuarioModels);
            return Ok(usuario);
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            Usuario usuario = new Usuario();
            _logger.LogInformation("Add : " + id);
            if (id == null || id <= 0)
            {
                return BadRequest(new UsuarioModels { Success = false, ErrorCode = "S01", ErrorMessage = "Invalid usuario request" });
            }
            usuarioRepository.Delete(id);
            return Ok(id);
        }
    }
}

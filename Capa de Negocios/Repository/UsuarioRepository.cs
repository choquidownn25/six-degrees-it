using Capa.Domain.Dominio;
using Capa_de_Acceso_a_Datos.Modelss;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_de_Negocios.Repository
{
    public class UsuarioRepository : IBaseRepository<Usuario>
    {
        PruebaSdContext pruebaSdContext = new PruebaSdContext();
        private bool disposed = false; //Para detectar
        private TextReader reader;
        public Usuario Add(Usuario entity)
        {
            Usuario usuario = new Usuario();
            var response = pruebaSdContext.Usuarios.Add(entity);
            if (response == null)
                throw new NotImplementedException();
            else
            {
                pruebaSdContext.SaveChanges();
                using (var ctx = new PruebaSdContext())
                {
                    var Usuario = ctx.Usuarios.Where(s => s.Nombre == entity.Nombre).OrderBy(item => item.Nombre)
                                 .LastOrDefault<Usuario>();
                    usuario = new Usuario
                    {
                        UsuId = Usuario.UsuId,
                        Nombre = Usuario.Nombre,
                        Apellido = Usuario.Apellido
                    };
                }
                
            }

            return usuario;
        }

        public void Delete(int id)
        {
            try
            {
                Usuario Usuario = pruebaSdContext.Usuarios.Find(id);
                pruebaSdContext.Usuarios.Remove(Usuario);
                pruebaSdContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error  :  " + ex.Message.ToString());
            }
        }

        public void Dispose()
        {
            // Elimine los recursos no administrados.
            Dispose(true);
            // Suppress finalization.
            GC.SuppressFinalize(this);
        }

        public void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (reader != null)
                    {
                        reader.Dispose();
                    }
                }
                disposed = true;
            }
        }

        public IEnumerable<Usuario> GetAll()
        {
            try
            {
                List<Usuario> lstObj = new List<Usuario>();
                var result = (from item in pruebaSdContext.Usuarios
                              select new
                              {
                                  item.UsuId,
                                  item.Nombre,
                                  item.Apellido
                              }).ToList();

                foreach (var item in result)
                {
                    Usuario item1 = new Usuario();

                    item1.UsuId = item.UsuId;
                    item1.Nombre = item.Nombre;
                    item1.Apellido = item.Apellido;
                    lstObj.Add(item1);
                }

                return lstObj;
            }
            catch (Exception e)
            {
                throw new Exception(
                "Entity Validation Failed - errors follow:\n" +
                e.ToString(), e
                ); // Add the original exception as the innerException
            }
        }

        public Usuario GetById(int id)
        {
            var consulta = (from r in pruebaSdContext.Usuarios where r.UsuId == id select r).FirstOrDefault();
            if (consulta == null)
                throw new Exception("Entity Validation Failed - errors follow:\n"); // Add 
            else
                return consulta;
        }

        public Usuario Modify(Usuario entity)
        {
            Usuario resp = new Usuario();
            List<Usuario> listUsuario = new List<Usuario>();
            pruebaSdContext.Entry(entity).State = EntityState.Modified;
            //pruebaSdContext.SaveChanges();

            pruebaSdContext.SaveChanges();
            using (var ctx = new PruebaSdContext())
            {
                //string name = entity.Nombre;
                var personas = ctx.Usuarios.Where(s => s.UsuId == entity.UsuId).OrderBy(item => item.Nombre)
                              .LastOrDefault<Usuario>();
                listUsuario.Add(personas);
                foreach (Usuario persona in listUsuario)
                {
                    persona.UsuId = personas.UsuId;
                    persona.Nombre = personas.Nombre;
                    persona.Apellido = personas.Apellido;

                    resp = new Usuario()
                    {
                        UsuId = persona.UsuId,
                        Nombre = persona.Nombre,
                        Apellido = persona.Apellido
                    };
                }
            }
            if (resp != null)
                return resp;
            else
                throw new Exception("Entity Validation Failed - errors follow:\n"); // Add 
        }
    }
}

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TodoAppAPI.Concrate;
using TodoAppAPI.Model;
using TodoAppAPI.TodoAppDto;

namespace TodoAppAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class TodoAppController : Controller
    {
        private readonly TodoAppContext _context;
        private readonly IMapper _mapper;

        public TodoAppController(TodoAppContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("TodoCreate")]
        public IActionResult TodoAdd(TodoAppCreate todoAppCreate)
        {
            _context.Todos.Add(_mapper.Map<Todo>(todoAppCreate));
            _context.SaveChanges();
            return Ok("Ekleme Basarili..");
        }

        [HttpDelete("TodoRemove")]
        public IActionResult TodoDelete(int id)
        {
            var deleteTodo = _context.Todos.Where(x => x.TodoID == id).FirstOrDefault();
            if (deleteTodo != null)
            {
                _context.Todos.Remove(deleteTodo);
                _context.SaveChanges();
                return Ok("Silme Basarili..");
            }
            else
            {
                return NotFound("Deger Bulunamadi..");
            }
        }

        [HttpGet("TodoList")]
        public IActionResult TodoList()
        {      
            var value = _context.Todos.ToList();
            return Ok(value);
        }
    }
}

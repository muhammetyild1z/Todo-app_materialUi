using AutoMapper;
using Microsoft.AspNetCore.Identity;
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
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;

        public TodoAppController(TodoAppContext context, IMapper mapper, SignInManager<AppUser> signInManager, UserManager<AppUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("TodoCreate")]
        public IActionResult TodoAdd(TodoAppCreateDto todoAppCreate)
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
        public IActionResult TodoList( )
        {      
            var value = _context.Todos.ToList().OrderByDescending(x=>x.TodoDate);
            return Ok(value);
        }


        [HttpPost("TodoEdit")]
        public IActionResult TodoEdit( TodoAppUpdateDto todoAppUpdateDto)
        {
            var unchangedTodo = _context.Todos.Find(todoAppUpdateDto.TodoID);  
            _context.Entry(unchangedTodo).CurrentValues.SetValues(todoAppUpdateDto);   
            _context.SaveChanges();
            return Ok("Ba;ariyla guncellendi");
        }


        [HttpPost("TodoLogin")]
        public async Task<IActionResult> TodoLogin(TodoAppLoginDto todoAppLoginDto)
        {
            var userjson = _mapper.Map<AppUser>(todoAppLoginDto);
            
            var result = await _signInManager.PasswordSignInAsync(userjson.UserName, userjson.PasswordHash, false, false);
            if (result.Succeeded)
            {
                return Ok("Kullanici Girisi Basarili..");
            }

            return BadRequest("Kullanici Girisi Yapilamadi..");
        }

        [HttpPost("TodoRegister")]
        public async Task<IActionResult> TodoRegister(TodoAppRegisterDto todoAppRegisterDto)
        {

            var result = await _userManager.CreateAsync(
                 _mapper.Map<AppUser>(todoAppRegisterDto),
                todoAppRegisterDto.Password
                );
            if (result.Succeeded)
            {
                return Ok("Kullanici Eklendi..");
            }

            return Ok("Kullanici Eklenemedi..");
        }

    }
}

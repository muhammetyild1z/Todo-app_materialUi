using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TodoAppAPI.TodoAppDto;

namespace Todo_app.Controllers
{
    public class TodoAppController : Controller
    {
        private readonly HttpClient _httpClient;
        public TodoAppController()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://localhost:7088/api/TodoApp/");
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        }

        [HttpPost]
        public async Task< IActionResult> CreateTodo(TodoAppCreate todoAppCreate)
        {
            var jsonData = JsonConvert.SerializeObject(todoAppCreate);
            HttpContent httpContent = new StringContent(jsonData);
            var responseMessage = await _httpClient.PostAsync("TodoAdd", httpContent);
            if (responseMessage.IsSuccessStatusCode)
            {
                return View();
            }
            else
            {
                ViewBag.CreateTodoFailed = "Ekleme Basarisiz..";
                return View();
            }
           
        }
    }
}

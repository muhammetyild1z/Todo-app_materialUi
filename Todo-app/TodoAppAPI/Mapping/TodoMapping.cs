using AutoMapper;
using TodoAppAPI.Model;
using TodoAppAPI.TodoAppDto;

namespace TodoAppAPI.Mapping
{
    public class TodoMapping: Profile
    {
        public TodoMapping()
        {
            CreateMap<Todo, TodoAppCreate>().ReverseMap();
            CreateMap<Todo, TodoAppResult>().ReverseMap();
            CreateMap<Todo, TodoAppUpdate>().ReverseMap();
        }
      
    }
}

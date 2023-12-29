using AutoMapper;
using TodoAppAPI.Model;
using TodoAppAPI.TodoAppDto;

namespace TodoAppAPI.Mapping
{
    public class TodoMapping: Profile
    {
        public TodoMapping()
        {
            CreateMap<Todo, TodoAppCreateDto>().ReverseMap();
            CreateMap<Todo, TodoAppResultDto>().ReverseMap();
            CreateMap<Todo, TodoAppUpdateDto>().ReverseMap();
            CreateMap<AppUser, TodoAppRegisterDto>().ReverseMap();
        }
      
    }
}

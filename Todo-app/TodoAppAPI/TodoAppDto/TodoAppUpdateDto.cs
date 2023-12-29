namespace TodoAppAPI.TodoAppDto
{
    public class TodoAppUpdateDto
    {
        public int TodoID { get; set; }
        public string TodoTitle { get; set; }
        public DateTime TodoDate { get; set; }
        public string TodoDesc { get; set; }
    }
}

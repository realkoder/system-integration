
class Program
{
    static void Main(string[] args)
    {
        ReadFileAndPrint("another-csv-file.csv");
    }

    public static void ReadFileAndPrint(string fileName)
    {
        try
        {
            string filePath = "../../00._Files/" + fileName;
            string content = System.IO.File.ReadAllText(filePath);
            string fileFormat = System.IO.Path.GetExtension(filePath).Split('.')[1];

            Console.WriteLine("File format is: " + fileFormat);
            Console.WriteLine(content);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading file: {ex.Message}");
        }
    }
}

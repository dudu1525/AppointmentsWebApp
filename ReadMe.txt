for backend installations:

dotnet and c# vscode extensions
nuget gallery extension

EntityFramework Core/Design/Tools/SqlServer nuget packages installed

dotnet tool install --global dotnet-ef  

After creating the 'tables' within models and creating the connection class run:

dotnet ef migrations add {nameofmigration}

dotnet ef database update


dotnet add package Swashbuckle.AspNetCore <<for swagger


default page: http://localhost:5159/swagger/index.html
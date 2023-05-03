using back.Models;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;

//Conectar Servicios
using back.Services.Cotizacion;
using back.Services.Implementar;

//Conectar Mapeo y utilidades 
using AutoMapper;
using back.Map;
using back.Utilidades;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Server = BOGDSPARRACH\\SQLEXPRESS; DataBase = DBFac; Trusted_Connection = true; TrustServerCertificate = True

builder.Services.AddDbContext<DbfactContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("cadenaSQL"));
});

//Inyeccion Servicios
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<IInfoService, InfoService>();

//Inyeccion Map y utilidades
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy("Regla", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


//Solicitudes Api rest
app.MapGet("/supplier/listar", async (
   ISupplierService _supplierSer,
   IMapper _mapear
   ) => {
    var listSupplier = await _supplierSer.GetList();
    var listSupplierMap = _mapear.Map<List<SupplierMap>>(listSupplier);

     if (listSupplierMap.Count > 0)
         return Results.Ok(listSupplierMap);
     else
         return Results.NotFound();
         });


app.MapGet("/info/listar", async(
    IInfoService _infoSer,
    IMapper _mapear
    ) =>{
     var listInfo = await _infoSer.GetList();
     var listinfoMap = _mapear.Map<List<InfoMap>>(listInfo);

    if (listinfoMap.Count > 0)
        return Results.Ok(listinfoMap);
    else
        return Results.NotFound();
        });


app.MapPost("/info/registrar", async (
    InfoMap mod,
    IInfoService _infoSer,
    IMapper _mapear
    ) =>{
      var _info = _mapear.Map<InfoFact>(mod);
     var _infoCreada = await _infoSer.Add(_info);

     if (_infoCreada.InfoId != 0)
         return Results.Ok(_mapear.Map<InfoMap>(_infoCreada));
     else
         return Results.StatusCode(StatusCodes.Status500InternalServerError);
    });


app.MapPut("/info/actualizar/{InfoId}", async (
   int InfoId,
   InfoMap mod,
   IInfoService _infoSer,
   IMapper _mapear
   ) => {
    var _busc = await _infoSer.Get(InfoId);
   if (_busc is null) return Results.NotFound();

   var _info = _mapear.Map<InfoFact>(mod);

    _busc.ActivityName = _info.ActivityName;
    _busc.Number = _info.Number;
    _busc.Valor = _info.Valor;
    _busc.Total = _info.Total;
    _busc.SupplierIdFk = _info.SupplierIdFk;

    var respuesta = await _infoSer.Update(_busc);

    if (respuesta)
        return Results.Ok(_mapear.Map<InfoMap>(_busc));
    else
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
      });
  

 app.MapDelete("/info/eliminar/{InfoId}", async (
     int InfoId,
      IInfoService _infoSer
    ) => {
        var _busc = await _infoSer.Get(InfoId);

       if (_busc is null) return Results.NotFound();

        var respuesta = await _infoSer.Delete(_busc);

        if (respuesta)
           return Results.Ok();
        else
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
    });
app.UseCors("Regla");

app.Run();
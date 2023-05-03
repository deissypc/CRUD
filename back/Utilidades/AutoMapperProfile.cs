using AutoMapper;
using back.Map;
using back.Models;
using System.Globalization;

namespace back.Utilidades
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ParamSupplier, SupplierMap>().ReverseMap();

            CreateMap<InfoFact, InfoMap>()
                .ForMember(reemplazar =>
                reemplazar.SupplierNombre,
                opt => opt.MapFrom(original => original.SupplierIdFkNavigation.SupplierName)
                )
                .ForMember(reemplazar =>
                reemplazar.Fecha,
                opt => opt.MapFrom(original => original.Fecha.Value.ToString("dd/MM/yyyy"))
                );

            CreateMap<InfoMap, InfoFact>()
                .ForMember(reemplazar =>
                reemplazar.SupplierIdFkNavigation,
                opt => opt.Ignore()
                )
                .ForMember(reemplazar =>
                reemplazar.Fecha,
                opt => opt.MapFrom(original => DateTime.ParseExact(original.Fecha,"dd/MM/yyyy", CultureInfo.InvariantCulture))
                );
        }

    }
}

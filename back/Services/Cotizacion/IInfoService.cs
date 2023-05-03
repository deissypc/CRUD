using back.Models;
using back.Services.Implementar;


namespace back.Services.Cotizacion
{
    public interface IInfoService
    {
        Task<List<InfoFact>> GetList();
        Task<InfoFact> Get(int InfoId);

        Task<InfoFact> Add(InfoFact mod);

        Task<bool> Update(InfoFact mod);

        Task<bool> Delete(InfoFact mod);
    }
}

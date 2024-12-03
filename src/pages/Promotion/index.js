//#region Imports
import React from 'react';
import promo from '../../assets/promo.png'
//#endregion

//#region Promotion Data
const promotions = [
  {
    name: 'BLACK FRIDAY MUA 1 TẶNG 1 - 2 PIZZA & 2 NƯỚC CHỈ TỪ 205.000VND',
    description: '* Mua 1 Pizza size M/L kèm 2 thức uống nhỏ sẽ được tặng 1 Pizza cùng size.',
    description2: ' Áp dụng từ 29/11 đến 02/12/2024 cho hình thức Dùng tại chỗ, Mua mang về hoặc Giao hàng tận nơi.',
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    targetAudience: 'Khách hàng mới',
    offers: 'Giảm giá 20%',
    maxProducts: 100,
  },
  {
    name: 'Khuyến mãi 2',
    description: 'Mô tả chương trình khuyến mãi 2',
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    targetAudience: 'Khách hàng thân thiết',
    offers: 'Mua 1 tặng 1',
    maxProducts: 50,
  },
  {
    name: 'Khuyến mãi 3',
    description: 'Mô tả chương trình khuyến mãi 3',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    targetAudience: 'Tất cả khách hàng',
    offers: 'Giảm giá 10%',
    maxProducts: 200,
  },
  {
    name: 'Khuyến mãi 4',
    description: 'Mô tả chương trình khuyến mãi 4',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    targetAudience: 'Khách hàng VIP',
    offers: 'Giảm giá 30%',
    maxProducts: 30,
  },
  {
    name: 'Khuyến mãi 5',
    description: 'Mô tả chương trình khuyến mãi 5',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    targetAudience: 'Khách hàng mới',
    offers: 'Giảm giá 15%',
    maxProducts: 150,
  },
];
//#endregion

//#region Promotion Component
function Promotion() {
  return (
    <>
      <div className="bg-dark bg-cover--black-zone bg-grey-lightes" style={{ backgroundImage: `url(${promo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto px-4 py-8 max-w-[960px]">
          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="flex flex-col gap-4 !border-[#dfe4ea]">
                {promotions.map((promo, index) => (
                  <div key={index} className="rounded shadow-lg flex">
                    {/* Image Section */}
                    <div className="border border-[#717273] rounded-xl p-2 bg-transparent md:w-1/4 overflow-hidden mr-2">
                      <a href="your-link-here">
                        <img src="https://img.dominos.vn/Family-Combo.png" alt="Promotion" className="w-full h-full object-cover" />
                      </a>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white w-2/3 p-6 border-2 border-transparent rounded-xl p-2 overflow-hidden">
                      <h2 className="text-2xl font-bold mb-4" style={{ color: '#0078ae' }}>{promo.name}</h2>
                      <hr className="mb-4 w-1/5 border-t-4" />
                      <p className="mb-4 text-gray-600">{promo.description}</p>
                      <p className="mb-4 text-gray-600">{promo?.description2}</p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                      </div>
                      <div className="flex flex-col justify-start flex-wrap">
                        <button className="bg-[#fdedef] border border-[#f7b5bf] text-[#e31837] py-2 px-8 rounded hover:bg-[#fbcdd4] transition-colors mr-2 mb-2 max-w-[300px]">
                          <span className='font-bold'>PIZZA SIZE M + 2 NƯỚC NHỎ</span>
                        </button>
                        <button className="bg-[#fdedef] border border-[#f7b5bf] text-[#e31837] py-2 px-8 rounded hover:bg-[#fbcdd4] transition-colors mr-2 mb-2 max-w-[300px]">
                          <span className='font-bold'>PIZZA SIZE M + 2 NƯỚC NHỎ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
//#endregion

export default Promotion;
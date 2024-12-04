//#region Imports
import React from 'react';
import promo from '../../assets/promo.png'
import { toast } from 'react-toastify';
//#endregion

//#region Promotion Data
const promotions = [
  {
    name: 'FESTIVE DEAL MUA 2 TẶNG 3',
    image: 'https://img.dominos.vn/promotion+m2t3+-+3%27.png',
    description: [
      'Tặng lên đến 173.000VND với 2 lựa chọn:',
      '* FESTIVE DEAL 1: Mua 1 Pizza size M/L kèm 1 thức uống sẽ được tặng 1 phần MỲ Ý ĐẪM XỐT/ CÁNH GÀ 4PCS + 1 phần Tráng miệng + 1 lon Coca-Cola Zero Sugar.',
      '* FESTIVE DEAL 2: Mua 1 Pizza size M/L kèm 1 thức uống sẽ được tặng 1 phần GÀ VIÊN + 1 phần Tráng miệng + 1 lon Coca-Cola Zero Sugar.',
      '* Áp dụng từ 1/12 đến 31/12/2024 cho hình thức Dùng tại chỗ, Mua mang về hoặc Giao hàng tận nơi.'
    ],
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    targetAudience: 'Khách hàng thân thiết',
    offers: 'Mua 1 tặng 1',
    maxProducts: 50,
    combos: ['FESTIVE DEAL 1', 'FESTIVE DEAL 2']
  },
  {
    name: 'GIẢM 70% CHO PIZZA THỨ 2',
    image: 'https://img.dominos.vn/Family-Combo.png',
    description: ['* Mua 1 Pizza size M/L kèm thức uống lớn bất kỳ hoặc 2 th���c uống nhỏ được giảm 70% cho Pizza thứ 2 (tiết kiệm từ 109.000VND) cùng size có giá bằng hoặc thấp hơn Pizza thứ nhất.',
      '* Áp dụng cho Mua Mang Về & Giao Hàng Tận Nơi tất cả các ngày trong tuần.'
    ],
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    targetAudience: 'Tất cả khách hàng',
    offers: 'Giảm giá 10%',
    maxProducts: 200,
    combos: ['PIZZA SIZE M + 1 NƯỚC LỚN', 'PIZZA SIZE L + 1 NƯỚC LỚN','PIZZA SIZE M + 2 NƯỚC NHỎ','PIZZA SIZE L + 2 NƯỚC NHỎ']
  },
  {
    name: '[SAME PRICE] PIZZA ĐỒNG GIÁ 99.000VND',
    image: 'https://img.dominos.vn/web+sp99.png',
    description: [
      '* Pizza đồng giá 99.000VND (size M) hoặc 149.000VND (size L) khi mua từ 02 Pizza trở lên, áp dụng cho Sausage Kid Mania, Cheesy Chicken Bacon, Veggie Mania, Teriyaki Chicken, Hawaiian, Cheese Mania – Tiết kiệm đến 45%.',
      '+ Thêm 40.000VND/ Pizza để nâng cấp lên dòng Seafood Cravers, Traditional & Meat Lovers.',
      '+ Thêm 60.000VND/ Pizza để nâng cấp lên American Cheeseburger, Habanero Cheeseburger, Seafood Lime Pesto, Super Topping (trừ dòng Super Topping của American Cheeseburger, Habanero Cheeseburger Seafood Lime Pesto, ).',
      `* Áp dụng cho Dùng tại chỗ, Mua mang về hoặc Giao hàng tận nơi tại các cửa hàng Domino's được chỉ định.`
    ],
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    targetAudience: 'Khách hàng mới',
    offers: 'Giảm giá 20%',
    maxProducts: 100,
    combos: ['PIZZA SIZE M', 'PIZZA SIZE L']
  },
  {
    name: '[FAMILY COMBO] VUI TIỆC CẢ NHÀ CHỈ TỪ 93.000VND/ NGƯỜI',
    image: 'https://img.dominos.vn/web+sp99.png',
    description: [
      '* Combo 279.000VND (Giá gốc: 357.000VND) dành cho 2-3 người gồm 1 Pizza size M bất kỳ + 1 phần Gà Viên Phô Mai Đút Lò + 3 thức uống nhỏ + 1 Voucher 2-tặng-1 Kid Pizza Maker.',
      '* Combo 279.000VND (Giá gốc: 425.000VND) dành cho 2-3 người gồm 1 Pizza size M bất kỳ + 1 phần Khai Vị Tổng Hợp + 1 Chocochips + 3 thức uống nhỏ + 1 Voucher 2-tặng-1 Kid Pizza Maker.',
      '* Combo 399.000VND (Giá gốc: 586.000VND) dành cho 4-5 người gồm 2 Pizza size M bất kỳ + 1 phần Gà Viên Phô Mai Đút Lò + 1 phần Bánh Cuộn Xốt Sô-cô-la + 1 thức uống lớn + 1 Voucher 2-tặng-1 Kid Pizza Maker.',
    ],
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    targetAudience: 'Khách hàng mới',
    offers: 'Giảm giá 20%',
    maxProducts: 100,
    combos: ['COMBO 279.000VND', 'COMBO 309.000VND','COMBO 399.000VND']
  },
];
//#endregion

//#region Promotion Component
function Promotion() {
  return (
    <>
      <div className="bg-dark bg-cover--black-zone bg-grey-lightes" style={{ backgroundImage: `url(${promo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto px-4 py-8 max-w-[1060px]">
          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="flex flex-col gap-4 !border-[#dfe4ea]">
                {promotions.map((promo, index) => (
                  <div key={index} className="rounded shadow-lg flex">
                    {/* Image Section */}
                    <div className="border border-[#717273] rounded-xl p-2 bg-transparent md:w-1/4 overflow-hidden mr-2">
                      <a href="#">
                        <img src={promo.image} alt={promo.name} className="w-full object-cover" />
                      </a>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white w-2/3 p-6 border-2 border-transparent rounded-xl p-2 overflow-hidden">
                      <h2 className="text-2xl font-bold mb-4" style={{ color: '#0078ae' }}>{promo.name}</h2>
                      <hr className="mb-4 w-1/5 border-t-4" />
                      {promo.description.map((desc, index) => (
                        <p key={index} className="mb-4 text-gray-600 font-bold">{desc}</p>
                      ))}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                      </div>
                      <div className="flex flex-wrap gap-4 mt-4">
                        {promo.combos && promo.combos.map((combo, index) => (
                          <button 
                            key={index}
                            onClick={() => toast.info("👨‍💻 Tính năng đang được phát triển")}
                            className="bg-[#fdedef] border border-[#f7b5bf] text-[#e31837] py-2 px-8 rounded hover:bg-[#fbcdd4] transition-colors whitespace-nowrap"
                          >
                            <span className='font-bold'>{combo}</span>
                          </button>
                        ))}
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
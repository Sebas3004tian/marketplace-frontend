import UserVector from '../../components/svg/User.svg';
import StoreVector from '../../components/svg/Store.svg';
import LogoVector from '../../components/svg/Logo1.svg';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className= "min-h-screen flex">
        <div className="flex-[1.5] bg-[#2B2D42]">
            <div className="mt-[60px] ml-[60px] h-[350px]">
                <div className="tittle">
                    <h1 className="text-4xl font-medium mb-4">Bienvenido a Modi</h1>
                </div>
                <div className="text-right pt-[100px] pr-[150px] pb-0">
                    <div className="ml-[70%] text-left w-[50%]">
                        <p className="text-xl mb-6">Empecemos con tu registro</p>
                        <p>Primero selecciona quien eres:</p>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-end w-full">
                <button className="flex items-center justify-center rounded-l-[10%]  cursor-pointer transition-all duration-300 w-[120px] h-[120px] bg-[#EDF2F4] border-none shadow-md hover:shadow-lg active:shadow-inner active:bg-[#edf2f4e7] active:transform active:translate-y-[2px]">
                    <Image
                        priority
                        src={UserVector}
                        alt=""
                        width={70}
                        height={70}
                    />
                </button>
            </div>
        </div>
        <div className="flex-[1] bg-[#EDF2F4]">
            <div className="mt-[60px] ml-[60px] h-[350px]">
                <div className="ml-[25%]">
                    <Image
                        priority
                        src={LogoVector}
                        alt=""
                        width={276}
                        height={262}
                    />
                </div>
            </div>
            <div className="flex justify-start w-full">
                <button className="flex items-center justify-center rounded-r-[10%] cursor-pointer transition-all duration-300 w-[120px] h-[120px] bg-[#2B2D42] border-none shadow-md hover:shadow-lg active:shadow-inner active:bg-[#2b2d42e6] active:transform active:translate-y-[2px]">
                    <Image
                        priority
                        src={StoreVector}
                        alt=""
                        width={80}
                        height={80}
                    />
                </button>
            </div>
            <a href="home/login" className="ml-[15%] absolute bottom-8 text-[#272B3F] no-underline hover:underline">¿Ya tienes cuenta? Ingresa Aquí</a>
        </div>
    </div>
  );
}

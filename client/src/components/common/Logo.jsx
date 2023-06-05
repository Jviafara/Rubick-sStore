import { BsFillGrid3X3GapFill } from 'react-icons/bs';

const Logo = () => {
    return (
        <div className="flex gap-2 justify-center items-center">
            <BsFillGrid3X3GapFill size={24} />
            <h1 className="font-bold text-lg">
                <span className="text-green-700">R</span>
                <span className="text-black">u</span>
                <span className="text-blue-700">b</span>
                <span className="text-[#fc8403]">i</span>
                <span className="text-[#fcf403]">k</span>
                <span className="text-red-700">'s</span>
                <span className="text-black">Store</span>
            </h1>
        </div>
    );
};

export default Logo;


const BtnLoading = ({color, size}) => {
    return (
      <div className="flex justify-center items-center ">
        <div className={`animate-spin rounded-full ${size ? `h-${size} w-${size}` : 'h-5 w-5' } border-t-4 ${color? color : 'border-white'}`}></div>
      </div>
    );
  };
  
export default BtnLoading;
  
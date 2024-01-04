
const PageLoading = ({color, size}) => {
    return (
      <div className="flex justify-center items-center ">
        <div className={`animate-spin rounded-full ${size ? `h-${size} w-${size}` : 'h-20 w-20' } border-t-4 ${color? color : 'border-orange-600'}`}></div>
      </div>
    );
  };custom
  
export default PageLoading;
  
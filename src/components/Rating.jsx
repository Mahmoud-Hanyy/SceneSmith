export default function Rating({ rate }) {
  return (
    <>

      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled=  star <= Math.floor(rate)
        const isHalfFilled= star - rate < 1
        return (
          <i
            key={star}
            className={
                   isFilled
                ? "bi bi-star-fill"
                : isHalfFilled
                ? "bi bi-star-half"
                : "bi bi-star"
             
            }
            style={{  fontSize: isHalfFilled || isFilled ? '16px':'18px', color:'#00acc1', marginRight: '4px',              
              transform: !isFilled && !isHalfFilled ? 'translateY(-1px)' : 'none'
}}
          ></i>
        );
      })}
    </>
  );
}

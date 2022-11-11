import greater from "/images/chevron-small.svg";
interface IProps {
  details: {
    bodyType: string;
    modelName: string;
    imageUrl: string;
    modelType: string;
  };
}
const CarDetails = ({ details }: IProps) => {
  return (
    <div className="car-ctn">
      <div className="header">{details?.bodyType}</div>
      <div className="sub-header">
        <div>
          <strong>{details?.modelName}</strong>
        </div>
        <div>&nbsp;{details?.modelType}</div>
      </div>
      <img src={details?.imageUrl} className="car-img" loading="lazy" alt="" />
      <div className="car-footer">
        <div>
          Learn <img className="grt-img" loading="lazy" src={greater} alt="" />
        </div>
        <div>
          Shop <img className="grt-img" loading="lazy" src={greater} alt="" />{" "}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;

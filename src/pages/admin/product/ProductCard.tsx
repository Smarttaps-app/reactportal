import { Card, Statistic } from "antd";
import { Common } from "../../../utils/Common";
import { IProduct, ProductCardProps } from "../../../utils/type";

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  sessionKey,
  valueKey,
  loading,
  data,
  error,
}) => {
  const totalSum = Common.countByKey(
    data,
    valueKey as keyof IProduct,
    sessionKey
  );
  const valueColor = totalSum > 0 ? "#3f8600" : "#ff4d4f";

  return (
    <Card className="!rounded-lg">
      <Statistic
        title={title}
        loading={loading}
        value={error || !data ? 0 : totalSum}
        valueStyle={{ color: valueColor }}
      />
    </Card>
  );
};

export default ProductCard;

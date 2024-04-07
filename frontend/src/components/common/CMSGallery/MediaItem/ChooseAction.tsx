import { Col, Row } from "antd";
import { Button } from "~/components/ui/button";
import { FiEye } from "react-icons/fi";

type ChooseActionProps = {
  onClick: () => void;
  onClickView: () => void;
};

const ChooseAction = (props: ChooseActionProps) => {
  return (
    <Row gutter={[24, 12]} className="px-5">
      <Col span={24}>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            props.onClick();
          }}
          className="w-full"
        >
          Choose
        </Button>
      </Col>
      <Col span={24}>
        <Row gutter={12}>
          <Col span={24}>
            <Button
              type="button"
              variant={"secondary"}
              className="bg-white w-full"
              onClick={props.onClickView}
            >
              <FiEye className="mr-2" /> View
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ChooseAction;

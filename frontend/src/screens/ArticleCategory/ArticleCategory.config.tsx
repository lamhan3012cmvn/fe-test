import { Tag } from "antd";
import { Typography } from "antd";
import {
  ELEMENT_STATUS,
  ELEMENT_STATUS_LIST,
} from "~/constants/common.constant";
const { Paragraph } = Typography;

export const articleCategoryListColumns = [
  {
    title: "Title",
    width: 100,
    tableLayout: "fixed",
    render: (record: any) => (
      <Paragraph
        ellipsis={{
          rows: 4,
        }}
      >
        {record?.title}
      </Paragraph>
    ),
    sorter: {
      multiple: 3,
    },
  },
  {
    title: "Slug",
    width: 100,
    tableLayout: "fixed",
    render: (record: any) => (
      <Paragraph
        ellipsis={{
          rows: 4,
        }}
      >
        {record?.slug}
      </Paragraph>
    ),
    sorter: {
      multiple: 3,
    },
  },
  {
    title: "Status",
    width: 100,
    tableLayout: "fixed",
    dataIndex: "status",
    render: (status: ELEMENT_STATUS) => (
      <Tag color="magenta">
        {ELEMENT_STATUS_LIST.find((e) => e.value == status)?.label || ""}
      </Tag>
    ),
  },
];

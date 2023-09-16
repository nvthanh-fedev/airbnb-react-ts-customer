import { useSelector } from "react-redux";
import { RootState } from "../../Redux/configStore";
import { Spin } from "antd";
type Props = {};

// eslint-disable-next-line no-empty-pattern
export default function Loading({}: Props) {
  const { isLoading } = useSelector(
    (state: RootState) => state.userManagementReducer
  );

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        zIndex: 10,
        background: "rgba(0,0,0,.5)",
        display: isLoading ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        top: 0,
        color: "#fff",
      }}
    >
      <Spin />
    </div>
  );
}

import ReactDOM from "react-dom";

import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";

import { createBrowserHistory } from "history";
import HomeTemplate from "./Templates/HomeTemplate";
import "./globalStyles.css";
import Loading from "./Components/Loading/Loading";
import { store } from "./Redux/configStore";
import { Provider } from "react-redux";
import ResponsiveItem from "./Templates/ResponsiveItem";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import Profile from "./Pages/Profile/Profile";
import RoomBooked from "./Pages/RoomBooked/RoomBooked";
import BookingSucces from "./Pages/BookingSucces/BookingSucces";

export const history: any = createBrowserHistory();

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.render(
  <Provider store={store}>
    <Loading></Loading>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<ResponsiveItem component={Home} />}></Route>
          <Route path="rooms">
            <Route path=":id" element={<ResponsiveItem component={Detail} />} />
          </Route>
          <Route
            path="profile"
            element={<ResponsiveItem component={Profile} />}
          />
          <Route
            path="roombooked"
            element={<ResponsiveItem component={RoomBooked} />}
          />
          <Route
            path="bookingsuccess"
            element={<ResponsiveItem component={BookingSucces} />}
          />
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>,
  rootElement
);

/*
  type React
  <div></div>: JSX.element
  function (props) => jsx : React.FC

*/

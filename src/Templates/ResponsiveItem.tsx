//tsrafce

import React, { useEffect, useState } from "react";

type Props = {
  xsComponent?: React.FC;
  smComponent?: React.FC;
  mdComponent?: React.FC;
  lgTableComponent?: React.FC;
  component: React.FC;
};

interface Screen {
  width: number;
  height?: number;
}

const ResponsiveItem = (props: Props) => {
  const [screen, setScreen] = useState<Screen>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const changeDevice = () => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("load", changeDevice);
    window.addEventListener("resize", changeDevice);

    return () => {
      window.removeEventListener("load", changeDevice);
      window.removeEventListener("resize", changeDevice);
    };
  }, []);

  let Component = props.component;
  if (screen.width < 576 && props.xsComponent) {
    Component = props.xsComponent;
  } else if (screen.width >= 576 && props.smComponent) {
    Component = props.smComponent;
  } else if (screen.width >= 768 && props.mdComponent) {
    Component = props.mdComponent;
  } else if (screen.width >= 992 && props.lgTableComponent) {
    Component = props.lgTableComponent;
  } else if (screen.width > 992 && props.component) {
    Component = props.component;
  }

  return <Component />;
};

export default ResponsiveItem;

//<ResponsiveItem component={Home} smComponent={HomeMobile} /> React.FC
//<ResponsiveItem component={<Home />} smComponent={<HomeMobile />} /> //JSX.element

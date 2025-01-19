import type { ComponentChildren } from "preact";
import React from "preact/compat";

export enum BannerType {
  Success = "success",
  Warning = "warning",
  Info = "info",
  Error = "error",
}

interface Props {
  type: BannerType;
  children: ComponentChildren | undefined;
  hideIcon: boolean;
}

export default function Banner(props: Props) {
  // const getBannerIcon = (type: BannerType) => {
  //   switch (type) {
  //     case BannerType.Info:
  //       return "information";
  //     case BannerType.Success:
  //       return "check";
  //     case BannerType.Warning:
  //       return "warning";
  //     case BannerType.Error:
  //       return "stop-alert";
  //   }
  // };

  return (
    <>
      <div className={`banner banner-${props.type}`}>
        {!props.hideIcon && (
          <span className="banner-icon">
            {/* TODO: Figure out how to use Icon component */}
            {/* <Icon icon={`mdi:${getBannerIcon(props.type)}`} /> */}
          </span>
        )}
        {props.children}
      </div>
    </>
  );
}

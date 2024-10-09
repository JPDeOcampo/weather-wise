"use client";
import { useContext } from "react";
import { ShareContext } from "../context/share-state";
import Skeleton from "react-loading-skeleton";

const SkeletonLoading = ({ count, width, height }) => {
  const { darkMode } = useContext(ShareContext);
  return (
    <Skeleton
      baseColor={`${darkMode ? "#0f1729" : "#6c91e7"}`}
      highlightColor={`${darkMode ? "#14203b" : "#5b85e5"}`}
      count={count}
      width={width}
      height={height}
    />
  );
};
export default SkeletonLoading;

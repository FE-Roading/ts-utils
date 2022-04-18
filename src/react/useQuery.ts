import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import qs from "query-string";

export function useQuery() {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  // 保存query状态
  const queryState = useRef(qs.parse(search));
  // 设置query
  const setQuery = (handler) => {
    const nextQuery = handler(queryState.current);
    queryState.current = nextQuery;
    // replace会使组件重新渲染
    navigate(nextQuery ? pathname + "?" + qs.stringify(nextQuery) : pathname, { replace: true });
  };
  return [queryState.current, setQuery];
}

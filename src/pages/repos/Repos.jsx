import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos } from "../../store/actions";

export default function Repos() {
  const dispatch = useDispatch();
  const {loading, repos} = useSelector((state) => state.repos);

  useEffect(() => {
    dispatch(fetchRepos());
  }, [dispatch]);

  console.log(repos)

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 text-center border-bottom">
        <h1 className="h3">GitHub Repositories</h1>
      </header>

    </div>
  )
}
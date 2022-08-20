import axios from "axios";
import React, { useEffect, useState } from "react";
import { PostCard } from "../post/PostCard";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const loadArticles = async () => {
    const { data } = await axios.get(`/api/articles`);
    setArticles(data.articles);
    console.log(data)
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (<div>
      {articles.map((article, i) =>(
          <ArticleCard key={i} article={article} />
      ))}
  </div>);
};

export default ArticleList;

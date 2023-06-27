import React, { useEffect, useState } from "react";
import "./Docker.css";
import axios from "axios";

const Docker = () => {
  const USER = "saileshp56";
  //   const URL = `https://hub.docker.com/v2/repositories/${USER}/`;
  const URL = ``;

  //   const ProxyURL = "https://cors-anywhere.herokuapp.com/";
  const ProxyURL = "http://localhost:8080";

  const [repoArr, setRepoArr] = useState([]);
  const [apiFail, setApiFail] = useState(false);

  const getRepos = async () => {
    try {
      const response = await axios.get(ProxyURL + URL);
      console.log(response.data);
      setRepoArr(response.data.results);
    } catch (error) {
      console.error(error);
      setApiFail(true);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  const getLink = (name) => {
    const baseURL = `https://hub.docker.com/repository/docker/${USER}/`;
    return baseURL + name + "/";
  };

  const getVanityName = (name, namespace) => {
    return namespace + "/" + name;
  };

  return (
    <div>
      {apiFail ? (
        <p className="project-header-content">
          Due to high website traffic, I am unable to display the rest of my
          projects. Please visit{" "}
          <a
            href="https://hub.docker.com/u/saileshp56"
            target="_blank"
            rel="noopener noreferrer"
            className="project-title"
          >
            my Docker Hub profile
          </a>{" "}
          to see them, and try again in the next hour.
        </p>
      ) : (
        repoArr.map((repo, index) => {
          const link = getLink(repo.name);
          const vanityName = getVanityName(repo.name, repo.namespace);

          return (
            <div key={index} className="project-div">
              <div className="project-title">
                <a href={link} target="_blank" rel="noreferrer">
                  <h1>{vanityName}</h1>
                </a>
              </div>
              <p>{repo.description}</p>
              <div className="content-types">
                {repo.content_types.map((type, idx) => (
                  <span key={idx} className="content-type-tag">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Docker;

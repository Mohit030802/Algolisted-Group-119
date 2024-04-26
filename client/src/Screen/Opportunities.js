import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterListIcon from "@material-ui/icons/FilterList";
import InfoIcon from "@material-ui/icons/Info";
import SimpleFooter from "../Components/SimpleFooter";
import CallMadeIcon from "@material-ui/icons/CallMade";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CCHeaderDarkPlus from "../Components/CCHeaderDarkPlus";
import CCHeaderPlus from "../Components/CCHeaderPlus";
import LeftMenu from "../Components/LeftMenu";
import LeftMenuDark from "../Components/LeftMenuDark";

import axios from "axios";
import { LinearProgress } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DoneIcon from "@material-ui/icons/Done";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LazyLoad from "react-lazy-load";

const Opportunities = () => {
  const [needDarkMode, setNeedDarkMode] = useState(false);
  const [openVisualiser, setOpenVisualiser] = useState(false);
  const [filterContestType, setFilterContestType] = useState("All");
  const [filterContestTypeName, setFilterContestTypeName] =
    useState("Job Type");
  const [openModel1, setOpenModel1] = useState(false);
  const [openModel2, setOpenModel2] = useState(false);
  const [openModel3, setOpenModel3] = useState(false);
  const [openModel4, setOpenModel4] = useState(false);
  const [applyMagicFilter, setApplyMagicFilter] = useState(false);
  const [sliderInputValue, setSliderInputValue] = useState("Fresher");
  const [location, setLocation] = useState("All Location");
  const [status, setStatus] = useState("Status");
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [markedOpportunities, setMarkedOpportunities] = useState([]);
  const [mark, setMark] = useState(false);
  const [declinedOpportunities, setDeclinedOpportunities] = useState([]);
  const [dec, setDec] = useState(false);
  const [likedOpportunities, setLikedOpportunities] = useState([]);
  const [lik, setLik] = useState(false);
  const [data, setData] = useState([]);
  const [opportunityClasses, setOpportunityClasses] = useState("");
  let count = 0;

  useEffect(() => {
    document.title = "All Internship and Job Opportunities - Algolisted";
  }, []);

  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") setNeedDarkMode(false);
    if (selectedTheme === "light") setNeedDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };

  useEffect(() => {
    axios
      .get(
        `https://script.googleusercontent.com/macros/echo?user_content_key=j9Co0fA6rp5kG1v2ji1_cWNf0Qyd9PiRVSMEFlosmhJLm00_tFel6zYGRqfJxOlWenWb_Exj0y9g-ljCbWFdh6qpF5o4vuRbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnA8Tr49F1Ivtr0o6Yp4fjnD9VY8k1Q0AdNpbEobTJSVU02RPIupYF5H0LqOn1gHHuTQr3i-TjMlDArlJytlu8mpjZbJ2bHHlb9z9Jw9Md8uu&lib=M_adtjhtYqTY4x3CHvLkZEzxNTvjCbw04`
      )
      .then((res) => {
        setAllOpportunities(res.data);
        //console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getImageLink = (source) => {
    const linkedinRegex = /linkedin\.com/;
    const whatsappRegex = /whatsapp\.com/;
    const telegramRegex = /telegram\.org/;
    const telegramRegex2 = /t\.me/;
    const youtubeRegex = /youtube\.com/;
    const googleRegex = /google\.com/;

    if (linkedinRegex.test(source)) {
      return "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png";
    } else if (whatsappRegex.test(source)) {
      return "https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png";
    } else if (telegramRegex.test(source) || telegramRegex2.test(source)) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png";
    } else if (youtubeRegex.test(source)) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/2048px-YouTube_social_red_circle_%282017%29.svg.png";
    } else if (googleRegex.test(source)) {
      return "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png";
    } else {
      // If no match, return a default image link
      return "https://imageio.forbes.com/specials-images/imageserve/63dd379b9ef3cd559331b7e2/Illustration-of-the-word--Ai---in-the-style-of-the-Google-logo/0x0.jpg?format=jpg&height=1080&width=1920";
    }
  };

  // Function to filter opportunities based on various criteria
  const filterOpportunities = (opportunities) => {
    return opportunities
      .filter((item) => (applyMagicFilter ? item.magic_filter === "yes" : true))
      .filter((item) => {
        if (filterContestTypeName === "Intern") {
          return item.type === "Intern";
        } else if (filterContestTypeName === "Full Time") {
          return item.type === "FTE";
        } else if (filterContestTypeName === "Job Type") {
          return true; // If no filter selected, show all
        }
      })
      .filter((item) => {
        if (sliderInputValue === "Fresher") {
          return item.years_exp === "Fresher" || item.years_exp === "fresher";
        } else if (sliderInputValue === "Experienced") {
          return item.years_exp !== "Fresher" && item.years_exp !== "fresher";
        }
      })
      .reverse();
  };

  // Usage in the component
  {
    filterOpportunities(allOpportunities).map((item, index) => (
      <div className="row" key={item.uniqueIdentifier}>
        {/* Your JSX code for rendering individual opportunities */}
      </div>
    ));
  }

  useEffect(() => {
    const getOpportunities = async () => {
      const res = await axios.get(
        "http://localhost:8000/opportunity/getopportunities"
      );
      setData(res.data);
    };
    getOpportunities();
  }, []);

  const toggleCompleted = async (index) => {
    const updatedData = [...data];
    updatedData[index].marked = !updatedData[index].marked;
    try {
      const email = localStorage.getItem("userEmail");
      const item = allOpportunities[index]; // Access the specific item using the index
      const title = item.job_title;
      const link = item.job_link;

      const res = await axios.post("http://localhost:8000/opportunity/added", {
        title,
        email,
        apply_link: link,
        marked: updatedData[index].marked,
      });
      console.log(res);
      setOpportunityClasses((prevState) => ({
        ...prevState,
        [index]: updatedData[index].marked ? "marked" : "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDecline = async (index) => {
    const updatedData = [...data];
    updatedData[index].decline = !updatedData[index].decline;
    try {
      const email = localStorage.getItem("userEmail");
      const item = allOpportunities[index];
      const title = item.job_title;
      const link = item.job_link;

      const res = await axios.post(
        "http://localhost:8000/opportunity/declined",
        {
          title,
          email,
          apply_link: link,
          decline: updatedData[index].decline,
        }
      );
      console.log(res);
      setOpportunityClasses((prevState) => ({
        ...prevState,
        [index]: updatedData[index].decline ? "decline" : "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLiked = async (index) => {
    const updatedData = [...data];
    updatedData[index].liked = !updatedData[index].liked;
    try {
      const email = localStorage.getItem("userEmail");
      const item = allOpportunities[index];
      const title = item.job_title;
      const link = item.job_link;

      const res = await axios.post("http://localhost:8000/opportunity/liked", {
        title,
        email,
        apply_link: link,
        liked: updatedData[index].liked,
      });
      console.log(res);
      setOpportunityClasses((prevState) => ({
        ...prevState,
        [index]: updatedData[index].liked ? "liked" : "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GrandContainer>
      <MobContainer>
        We are still working on Responsive Version of the website, please view
        the site with width more than 1100px, a standard laptop or tablet
        landscape.
        <img
          src="https://media4.giphy.com/media/13FrpeVH09Zrb2/giphy.gif"
          alt=""
        />
      </MobContainer>
      <Container needDarkMode={needDarkMode}>
      {needDarkMode ? (
          <CCHeaderDarkPlus
            needDarkMode={needDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        ) : (
          <CCHeaderPlus
            needDarkMode={needDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
        {needDarkMode ? (
          <LeftMenuDark marked={"opportunities"} />
        ) : (
          <LeftMenu marked={"opportunities"} />
        )}
       
        <div className="show-middle-content">
          <div className="cc-middle-content">
            <h1 className="main-heading">
              All Internship & Job Opportunities
              <div className="head-tag">
                Powered by Algolisted Scraper-Ai{" "}
                <img
                  draggable="false"
                  src="https://static.wixstatic.com/media/592002_0f04cb41e098424588d09e2fba76ec65~mv2.gif"
                  alt=""
                />
              </div>
            </h1>
            <p className="heading-supporter">
              This page provides information on a range of job openings and
              internship possibilities. While these opportunities are primarily
              tailored for students in India, we are actively working to
              incorporate opportunities from around the world as well.
            </p>
            {/* <div className="messages">
              <div className="message">
                <div className="icon"></div>
                <div className="text">
                  We are seeking out <b>small YouTube, Linkedin or Telegram channels</b> engaged in similar activities to ours, with a mutual interest in collaborating on this website.
                  If interested <i><a href="mailto:nayak.primary@gmail.com">contact here</a></i>
                </div>
              </div>
            </div> */}
            <h4>Information Extracted From : </h4>
            <div className="resources-used">
              {/* <div className="special-thanks"><img src="https://res.cloudinary.com/adaface/image/upload/v1583493789/adaface_logo.png" alt="" /></div> */}
              <div className="resource">
                <LazyLoad height={30}>
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
                    alt=""
                  />
                </LazyLoad>
              </div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png"
                    alt=""
                  />
                </LazyLoad>
              </div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
                    alt=""
                  />
                </LazyLoad>
              </div>
              <div className="resource">
                <LazyLoad height={30}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/YouTube_social_red_circle_%282017%29.svg/2048px-YouTube_social_red_circle_%282017%29.svg.png"
                    alt=""
                  />
                </LazyLoad>
              </div>
            </div>
            <SheetMessage needDarkMode={needDarkMode}>
              <div className="text">
                Explore the dynamics of the IT job market over the past six
                months to gain a comprehensive understanding of its current
                state. This page presents graphical representations of company
                job openings data, providing valuable insights into the
                prevailing trends and opportunities within the industry.
              </div>
              <div
                className="open-btn"
                onClick={() => setOpenVisualiser(!openVisualiser)}
              >
                {openVisualiser ? (
                  <>
                    <div className="desc">Close Visualization</div>
                    <ExpandLessIcon />
                  </>
                ) : (
                  <>
                    <div className="desc">Open Visualization</div>
                    <ExpandMoreIcon />
                  </>
                )}
              </div>
              {openVisualiser ? (
                <div className="all-resources">Under Development</div>
              ) : (
                <></>
              )}
            </SheetMessage>
            <EffectiveFilter
              className="noselect"
              needDarkMode={needDarkMode}
              applyMagicFilter={applyMagicFilter}
            >
              <div className="left">
                <div
                  className="filter-item check_color noselect"
                  onClick={() => setOpenModel1(!openModel1)}
                >
                  {" "}
                  {filterContestTypeName}
                  {openModel1 === false ? (
                    <ExpandMoreIcon />
                  ) : (
                    <ExpandLessIcon />
                  )}
                  {openModel1 ? (
                    <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                      <div
                        className="option"
                        data-value="Job Type"
                        onClick={(e) =>
                          setFilterContestTypeName(e.target.dataset.value)
                        }
                      >
                        Job Type
                      </div>
                      <div
                        className="option"
                        data-value="Intern"
                        onClick={(e) =>
                          setFilterContestTypeName(e.target.dataset.value)
                        }
                      >
                        Intern
                      </div>
                      <div
                        className="option"
                        data-value="Full Time"
                        onClick={(e) =>
                          setFilterContestTypeName(e.target.dataset.value)
                        }
                      >
                        Full Time
                      </div>
                    </ShowAbsoluteModelDropDown>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="filter-item check_color noselect"
                  onClick={() => setOpenModel2(!openModel2)}
                >
                  {" "}
                  {sliderInputValue}
                  {openModel2 === false ? (
                    <ExpandMoreIcon />
                  ) : (
                    <ExpandLessIcon />
                  )}
                  {openModel2 ? (
                    <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                      <div
                        className="option"
                        data-value="Fresher"
                        onClick={(e) =>
                          setSliderInputValue(e.target.dataset.value)
                        }
                      >
                        Fresher
                      </div>
                      <div
                        className="option"
                        data-value="Experienced"
                        onClick={(e) =>
                          setSliderInputValue(e.target.dataset.value)
                        }
                      >
                        Experienced
                      </div>
                    </ShowAbsoluteModelDropDown>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="filter-item check_color noselect"
                  onClick={() => setOpenModel3(!openModel3)}
                >
                  {" "}
                  {location}
                  {openModel3 === false ? (
                    <ExpandMoreIcon />
                  ) : (
                    <ExpandLessIcon />
                  )}
                  {openModel3 ? (
                    <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                      <div className="option">All Locations</div>
                      <div className="option">India</div>
                      <div className="option">Out of India</div>
                      <div className="option">Remote</div>
                    </ShowAbsoluteModelDropDown>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="filter-item check_color noselect"
                  onClick={() => setOpenModel4(!openModel4)}
                >
                  {" "}
                  {status}
                  {openModel4 === false ? (
                    <ExpandMoreIcon />
                  ) : (
                    <ExpandLessIcon />
                  )}
                  {openModel4 ? (
                    <ShowAbsoluteModelDropDown needDarkMode={needDarkMode}>
                      <div className="option">All Status</div>
                      <div className="option">Liked</div>
                      <div className="option">Filled</div>
                      <div className="option">Not Interested</div>
                    </ShowAbsoluteModelDropDown>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="right">
                {/* <div className="filter-item">A</div>
              <div className="filter-item">B</div>
              <div className="filter-item">C</div>
              <div className="filter-item">D</div> */}
                <div
                  className="filter-item filter-right"
                  onClick={() => setApplyMagicFilter(!applyMagicFilter)}
                >
                  Show for tier 1 & 2 college CSE students
                  <ChevronRightIcon />
                </div>
                {/* <div className="filter-item">Hide Problem Tags</div> */}
                {/* <div className="filter-item">Show Unsolved</div>  */}
              </div>
            </EffectiveFilter>
            <Table needDarkMode={needDarkMode}>
              <div className="row top-row">
                <div className="hash">Count</div>
                <div className="opportunity">Opportunity</div>
                {/* <div className="salary">Salary</div> */}
                {/* <div className="exp">Experience</div> */}
                {/* <div className="branch">Branch</div> */}
                <div className="source">Source</div>
              </div>

              {allOpportunities.length === 0 ? (
                <div className="linear-progess-holder">
                  <LinearProgress />
                </div>
              ) : (
                <>
                  {/* {console.log(filterContestTypeName)} */}
                  {/* {console.log(sliderInputValue)} */}
                  {filterOpportunities(allOpportunities).map((item, index) => (
                    <div
                      className={`row ${opportunityClasses[index]}`}
                      key={item.uniqueIdentifier}
                    >
                      <div className="hash">{++count}</div>
                      <div className="opportunity">
                        <div className="left">
                          <a
                            href={item.job_link}
                            target="_blank"
                            className="link"
                          >
                            {item.job_title} <CallMadeIcon />
                          </a>
                          <div className="extra-info">
                            {item.location && (
                              <div className="info">{item.location}</div>
                            )}
                            <div className="info">{item.role}</div>
                            <div className="info">{item.type}</div>
                            <div className="info">
                              {item.years_exp}
                              {item.years_exp === "Fresher"
                                ? null
                                : "+ Year Exp"}
                            </div>

                            {item.salary_low !== "-" ? (
                              <div className="info">
                                {item.salary_low}
                                {item.salary_low !== item.salary_high
                                  ? `- ${item.salary_high}`
                                  : null}
                                {item.type === "FTE" ? " LPA" : " INR"}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className={`right`}>
                          <div className={` ${opportunityClasses[index]}`}>
                            <CheckCircleOutlineIcon
                              onClick={() => toggleCompleted(index)}
                            />
                          </div>
                          <div className={` ${opportunityClasses[index]}`}>
                            <RemoveCircleOutlineIcon
                              onClick={() => toggleDecline(index)}
                            />
                          </div>
                          <div className={` ${opportunityClasses[index]}`}>
                            <FavoriteBorderIcon
                              onClick={() => toggleLiked(index)}
                            />
                          </div >
                          {/* <FavoriteIcon style={{"fill" : "#dd6565"}}/> */}
                        </div>
                      </div>
                      <div className="source">
                        <a href={item.source} target="_blank">
                          <img src={getImageLink(item.source)} alt="" />
                        </a>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Table>
          </div>
        </div>
        <SimpleFooter />
      </Container>
    </GrandContainer>
  );
};

export default Opportunities;

const GrandContainer = styled.div``;

const MobContainer = styled.div`
  width: 100vw;
  padding: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;

  img {
    width: calc(100% - 80px);
    margin: 40px;
    border-radius: 5px;
    display: block;
  }

  @media only screen and (min-width: 1099px) {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
  padding-bottom: 80px;

  @media only screen and (max-width: 1099px) {
    display: none;
  }

  display: flex;
  justify-content: space-between;
  padding-left: 200px;

  background-color: ${(props) =>
    props.needDarkMode ? "#313338" : "transparent"};

  a {
    color: ${(props) => (props.needDarkMode ? "#6d93d8" : "#18489f")};
  }

  input {
    background-color: transparent;
  }

  .show-middle-content {
    margin-bottom: 30px;
  }

  .cc-middle-content {
    min-height: 100vh;
    width: 100%;
    /* padding: 80px min(120px, 5vw) 50px min(120px, 5vw); */
    padding: 80px 120px 30px 120px;
    position: relative;
    width: 100%;
    max-width: 1360px;
    min-width: 850px;
    margin: auto;

    @media only screen and (max-width: 1200px) {
      padding: 80px 50px 30px 50px;
    }

    .main-heading {
      font-size: 1.65rem;
      font-weight: 600;
      color: ${(props) => (props.needDarkMode ? "#e5e6e8" : "#292929")};
      display: flex;
      align-items: center;
      .head-tag {
        display: inline;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.5rem;
        padding-right: 35px;
        border-radius: 100px;
        background-color: #a5bb26;
        margin-left: 10px;

        img {
          position: absolute;
          height: 2rem;
          margin-top: -7.5px;
          margin-left: -5px;
        }
      }
    }

    .heading-supporter {
      font-size: 1.05rem;
      margin-bottom: 10px;
      font-weight: 400;
      color: ${(props) => (props.needDarkMode ? "#ffffffa6" : "#696168")};

      a {
        color: ${(props) => (props.needDarkMode ? "#18489f" : "#18489f")};
        font-size: 0.95rem;
        font-weight: 300;
        margin-left: 0.25rem;
      }
    }

    h4 {
      margin-top: 40px;
      font-size: 1.05rem;
      color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
      font-weight: 500;
    }

    .resources-used {
      display: flex;
      flex-wrap: wrap;
      margin: 20px 0;

      .resource {
        margin: 0 7.5px 7.5px 0;
        border-radius: 50%;
        /* background-color: #f0f0f0; */
        border: 1px solid black;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 30px;
        }
      }

      .special-thanks {
        height: 50px;
        background-color: ${(props) =>
          props.needDarkMode ? "#2b2d31" : "whitesmoke"};
        border-radius: 100px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        margin: 0 7.5px 7.5px 0;

        img {
          height: 30px;
          border-radius: 100px;
          margin-top: -7.5px;
        }
      }
    }

    .messages {
      .message {
        display: inline-block;
        /* display: flex; */
        /* align-items: center; */
        background-color: ${(props) =>
          props.needDarkMode ? "#444754" : "#d5f7e1"};
        border-radius: 5px;
        padding: 10px;
        margin: 20px 0 10px 0;

        .text {
          font-size: 0.8rem;
          color: ${(props) => (props.needDarkMode ? "#b7b8ba" : "#13803b")};
          font-weight: 300;

          b {
            font-weight: 500;
            color: ${(props) => (props.needDarkMode ? "#b7b8ba" : "#13803b")};
          }
        }
      }
    }
  }
`;

const Table = styled.div`
  border: 1px solid
    ${(props) => (props.needDarkMode ? "#595b5f" : "rgb(202, 195, 195)")};
  border-radius: 5px;
  overflow: hidden;

  .row {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    border-top: 1px solid
      ${(props) => (props.needDarkMode ? "#595b5f" : "rgb(202, 195, 195)")};
    &.marked {
      background-color: ${(props) =>
        props.needDarkMode ? "#2e3b4c" : "#dcf8eb"};
    }
    &.decline {
      background-color: #f8d7da;
    }
    &.liked {
      background-color: #fff3cd;
    }
    .hash {
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      font-weight: 200;
      font-size: 0.85rem;
      border-right: 1px solid
        ${(props) => (props.needDarkMode ? "#595b5f" : "rgb(202, 195, 195)")};
      color: ${(props) => (props.needDarkMode ? "#fff" : "#333")};
    }

    .opportunity {
      flex: 1;
      padding: 15px 15px;

      border-right: 1px solid
        ${(props) => (props.needDarkMode ? "#595b5f" : "rgb(202, 195, 195)")};
      font-size: 0.85rem;
      font-weight: 500;

      display: flex;
      align-items: center;
      justify-content: space-between;
      .marked {
        background-color: ${(props) =>
          props.needDarkMode ? "#2e3b4c" : "#dcf8eb"};
      }
      .decline {
        background-color: #f8d7da;
      }
      .liked {
        background-color: #fff3cd;
      }
      .left {
        .link {
          color: ${(props) =>
            props.needDarkMode ? "#94b2e6" : "cornflowerblue"};
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: ${(props) =>
            props.needDarkMode ? "none" : "default"};

          svg {
            fill: ${(props) =>
              props.needDarkMode ? "#94b2e6" : "cornflowerblue"};
            font-size: 0.85rem;
          }

          &:hover {
            text-decoration: underline;
          }
        }

        .extra-info {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;

          .info {
            font-size: 0.7rem;
            font-weight: 300;
            padding: 2.5px 7.5px;

            border-radius: 100px;
            margin-right: 5px;
            border: 1px solid
              ${(props) =>
                props.needDarkMode ? "#595b5f" : "rgb(202, 195, 195)"};
            color: ${(props) => (props.needDarkMode ? "#fff" : "#333")};
          }
        }
      }

      .right {
        display: flex;
        align-items: center;

        svg {
          font-size: 2rem;
          margin-left: 5px;
          fill: ${(props) => (props.needDarkMode ? "#b4a7a6" : "#b5a6a6")};
        }
        .marked {
          .MuiSvgIcon-root {
            fill: orange;

            &:hover {
              transition-duration: 250ms;
              fill: orange;
              cursor: pointer;
            }
          }
        }
        .decline {
          .MuiSvgIcon-root {
            fill: #e81326;

            &:hover {
              transition-duration: 250ms;
              fill: #e81326;
              cursor: pointer;
            }
          }
        }
        .liked {
          .MuiSvgIcon-root {
            fill: green;

            &:hover {
              transition-duration: 250ms;
              fill: green;
              cursor: pointer;
            }
          }
        }
      }
    }

    .source {
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      font-weight: 200;
      font-size: 0.85rem;

      img {
        height: 25px;
        border-radius: 100px;
      }
    }
  }

  .top-row {
    border-top: none;

    .hash {
      background-color: ${(props) =>
        props.needDarkMode ? "#232323" : "whitesmoke"};
      font-weight: 500;
      border-right: 1px solid
        ${(props) => (props.needDarkMode ? "#595b5f" : "rgb(202, 195, 195)")};
      color: ${(props) => (props.needDarkMode ? "#fff" : "#333")};
    }

    .opportunity {
      background-color: ${(props) =>
        props.needDarkMode ? "#232323" : "whitesmoke"};
      font-weight: 500;
      border-right: 1px solid
        ${(props) => (props.needDarkMode ? "#595b5f" : "rgb(202, 195, 195)")};
      color: ${(props) => (props.needDarkMode ? "#fff" : "#333")};
    }

    .source {
      color: ${(props) => (props.needDarkMode ? "#fff" : "#333")};
      background-color: ${(props) =>
        props.needDarkMode ? "#232323" : "whitesmoke"};
      font-weight: 500;
    }
  }
`;

const EffectiveFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 20px 0;

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .filter-item {
      padding: 5px 10px;
      font-size: 0.7rem;
      color: ${(props) => (props.needDarkMode ? "#ebdddd" : "#4a4d5a")};
      border: 1px solid
        ${(props) => (props.needDarkMode ? "#595b5f" : "rgb(209, 213, 219)")};
      /* background-color: ${(props) =>
        props.needDarkMode ? "#e5e5e5" : "#201f1f"}; */
      border-radius: 3px;
      margin-right: 5px;
      cursor: pointer;
      /* color: #e5e5e5; */
      /* background-color: ${(props) =>
        props.needDarkMode ? "white" : "yellow"};  */

      position: relative;

      display: flex;
      align-items: center;

      svg {
        font-size: 1rem;
        margin-left: 5px;
        fill: ${(props) => (props.needDarkMode ? "#ebdddd" : "#4a4d5a")};
        /* fill: #e5e5e5; */
        /* fill: ${(props) => (props.needDarkMode ? "white" : "black")}; */
      }
    }
  }

  .right {
    display: flex;
    align-items: center;

    .filter-item {
      padding: 5px 10px;
      font-size: 0.7rem;
      border-radius: 3px;
      margin-left: 5px;
      cursor: pointer;
      color: ${(props) => (props.needDarkMode ? "#ebdddd" : "#4a4d5a")};
      border: 1px solid
        ${(props) =>
          props.needDarkMode
            ? props.applyMagicFilter
              ? "white"
              : "#595b5f"
            : props.applyMagicFilter
            ? "black"
            : "rgb(209, 213, 219)"};
      display: flex;
      align-items: center;

      svg {
        font-size: 1rem;
        margin-left: 5px;
        fill: ${(props) => (props.needDarkMode ? "#b4a7a6" : "#333")};
      }
    }

    .magic-filter {
      background-color: #404249;
      color: #333;
      background: linear-gradient(
        300deg,
        #56f238,
        #b3adff,
        #c5c5ef,
        #bde6ce,
        #56f238
      );
      background-size: 400% 400%;
      -webkit-animation: AnimationName 10s ease infinite;
      -moz-animation: AnimationName 10s ease infinite;
      animation: AnimationName 10s ease infinite;
      border-color: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      opacity: 0.75;
      /* border-radius: 100px; */

      a {
        color: #333;
      }

      &:hover {
        background-color: ${(props) =>
          props.needDarkMode ? "#2b2d31" : "whitesmoke"};
        color: #333;
        cursor: pointer;
        transition-duration: 500ms;
        opacity: 1;
      }
    }

    @-webkit-keyframes AnimationName {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @-moz-keyframes AnimationName {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes AnimationName {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }
`;

const ShowAbsoluteModelDropDown = styled.div`
  position: absolute;
  max-height: 200px;
  min-height: 30px;
  width: 200px;
  color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
  background-color: ${(props) => (props.needDarkMode ? "#2b2d31" : "#ffffff")};
  border: 1px solid
    ${(props) => (props.needDarkMode ? "#595b5f" : "rgb(209, 213, 219)")};
  border-radius: 5px;
  top: 35px;
  left: -5px;
  z-index: 10;
  /* overflow-y: scroll; */
  overflow: hidden;
  cursor: default;

  /* -webkit-box-shadow: 0px 0px 60px 0px rgba(219,212,219,1);
  -moz-box-shadow: 0px 0px 60px 0px rgba(219,212,219,1);
  box-shadow: 0px 0px 60px 0px rgba(219,212,219,1); */

  ::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  flex-direction: column;

  .option {
    height: 40px;
    border-bottom: 1px solid
      ${(props) => (props.needDarkMode ? "#595b5f" : "rgb(209, 213, 219)")};
    color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
    display: grid;
    padding: 0 10px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: ${(props) =>
        props.needDarkMode ? "#404249" : "#e5e5e5"};
      cursor: pointer;
      transition-duration: 250ms;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SheetMessage = styled.div`
  padding: 10px;
  margin: 50px 0 10px 0;
  /* border: 1px solid black; */
  border-radius: 5px;
  /* background-color: #c9e8ff; */
  background-color: ${(props) => (props.needDarkMode ? "#2b2d31" : "#f0f0f0")};

  .text {
    font-size: 0.8rem;
    color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
  }

  .open-btn {
    display: flex;
    align-items: center;
    cursor: pointer;

    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 15px;

    .desc {
      color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
    }

    svg {
      fill: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
    }
  }

  .all-resources {
    color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
    margin-top: 7.5px;
    font-size: 0.75rem;
    font-style: italic;

    img {
      height: 100px;
      border-radius: 10px;
      margin: 7.5px 7.5px 0 0;
    }
  }
`;

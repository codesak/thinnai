import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Dispatch, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { setArea, setCity, setLandmark, setLatitude, setLongitude } from "../../../actions/search";
import { ICitySettings } from "../../../reducers/appSettings";
import { RootState } from "../../../store";
import "../../styles/Main/locationCarousel.scss";
import { loadPlaces } from "../../../actions/main";

const Item = styled(Paper)(() => ({
  fontSize: "0.85rem",
  minHeight: "32px",
  border: "none",
  borderRadius: "7px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  boxShadow: "none",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  textAlign: "center",
  lineHeight: "16px",
  cursor: "pointer",
}));

interface locationProp {
  onClick: () => void;
  commingSoon:boolean
  setCommingSoon:Dispatch<React.SetStateAction<boolean>>
  setCityName:Dispatch<React.SetStateAction<string>>
  cityName:string;
}

const LocationCarousel = ({ onClick,commingSoon, setCommingSoon, setCityName,cityName }: locationProp) => {
  const cities = useSelector<RootState, ICitySettings[]>(
    (state) => state.appSettings.cities
  );
  
  const staticAssetPath = useSelector<RootState, string>(
    (state) => state.appSettings.staticAssetPath
  );
  const [selectLandmark, setSelectLandmark] = useState<any>([]);
  

  const dispatch: Dispatch<any> = useDispatch();

  //NearMe Selection
  const [selected, setSelected] = useState(false);
  const [underline, setUnderline] = useState(0)

  const [cityData, setCityData] = useState<ICitySettings>();

  //City Selection
  var slide = document.getElementsByClassName("slick-slide");

  //Geo Location-------start
  const [lat, setLat] = useState<number>(0)
  const [long, setLong] = useState<number>(0)
  navigator?.geolocation?.getCurrentPosition((position)=>{
    const latitude_State = position.coords.latitude
    const longitude_State = position.coords.longitude
    
      setLat(latitude_State)
      setLong(longitude_State)
  })

  //Geo-Location-------end

  const removeLocation = () => {
    for (var i = 0; i < slide.length; i++) {
      slide[i].classList.remove("slick-select");
      
    }
  };
  
  const selectLocation = (index: number) => {
    slide[index].classList.add("slick-select");
    slide[index].classList.add("cityImage")
    setCityName(cities[index].name)
    setUnderline(1000)
  };

  
  const locationSelect = (index: number) => {
    if(index===0){
      dispatch(setLatitude({ latitude:"" }));
      dispatch(setLongitude({ longitude:""}));
      
      for (var i = 0; i < slide.length; i++) {
        slide[i].classList.remove("slick-select");
      }
      setSelected(false);
      selectLocation(index);
      setSelectLandmark([])
      dispatch(setArea({area:""}))
      setCityData(cities[index]);
      dispatch(setCity({ city: cities[index]?.name }));
      dispatch(loadPlaces())
      setCommingSoon(true)}
      else{
      dispatch(setLatitude({ latitude:"" }));
      dispatch(setLongitude({ longitude:""}));
        
        for (var j = 0; j < slide.length; j++) {
          slide[j].classList.remove("slick-select");
        }
        setSelected(false);
        selectLocation(index);
        if(index===0){
        setCityData(cities[index]);}
        else{
          setCityData(cities[2])
        }
        setCommingSoon(false)
      }
  };

              // In multiple selection landmarks 

  // const landmarkSelect = (landmark: string, index: number) => {
  //   // dispatch(setArea({ area:concatib(cityData?.landmarks[index]) }));
  //   if (selectLandmark.includes(cityData?.landmarks[index])) {
  //     setSelectLandmark([
  //       ...selectLandmark.filter(
  //         (item: string) => item !== cityData?.landmarks[index]
  //       ),
  //     ]);
  //   } else {
  //     setSelectLandmark([...selectLandmark, cityData?.landmarks[index]]);
  //   }
  // };

  // useEffect(() => {
  //   console.log("effect");
    
  //   dispatch(setCity({ city: cityData?.name }));
  //   dispatch(loadPlaces())
  // }, [cityData, dispatch]);

  const Selection = () => {
    setSelected(true);
    setCommingSoon(true)
    removeLocation();
    dispatch(setCity({ city:"" }))
    dispatch(setArea({ area:"" }))
    dispatch(setLatitude({ latitude:lat }));
    dispatch(setLongitude({ longitude:long }));
    dispatch(loadPlaces())
  };

  const customSlider = useRef<Slider | null>(null);

  function next() {
    customSlider?.current?.slickNext();
  }
  function prev() {
    customSlider?.current?.slickPrev();
  }
 
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    swipeToSlide: true,
    slidesToShow: 9,
    autoPlay:false,
    initialSlide:0,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          initialSlide:2
        },
      },
    ],
  };
  const selectionLandmark = (landmarkIndex:number)=>{
    if(selectLandmark.length === 0)
    {
      setSelectLandmark([...[], cityData?.landmarks[landmarkIndex]])
      dispatch(setArea({area:concatib(cityData?.landmarks[landmarkIndex])}));
      dispatch(loadPlaces());
    }
    else if(selectLandmark.length !== 0 && (concatib(cityData?.landmarks[landmarkIndex]) === concatib(selectLandmark[0])))
    {
      setSelectLandmark([])
     dispatch(setArea({area:''}))
     dispatch(loadPlaces());
    }
    else if(selectLandmark.length !== 0 && (concatib(cityData?.landmarks[landmarkIndex]) !== concatib(selectLandmark[0])))
    {
      setSelectLandmark([...[], cityData?.landmarks[landmarkIndex]])
      dispatch(setArea({area:concatib(cityData?.landmarks[landmarkIndex])}));
      dispatch(loadPlaces());}
    else
    {
      setSelectLandmark([])
      dispatch(loadPlaces());
    }
  }
  //changes if location increases
  const selectionLandmarkInitial = (landmarkIndex:number)=>{
    if(selectLandmark.length === 0)
    {
      setSelectLandmark([...[], cities[0]?.landmarks[landmarkIndex]])
      dispatch(setArea({area:concatib(cities[0]?.landmarks[landmarkIndex])}));
      dispatch(loadPlaces());
    }
    else if(selectLandmark.length !== 0 && (concatib(cities[0]?.landmarks[landmarkIndex]) === concatib(selectLandmark[0])))
    {
      setSelectLandmark([])
     dispatch(setArea({area:''}))
     dispatch(loadPlaces());
    }
    else if(selectLandmark.length !== 0 && (concatib(cities[0]?.landmarks[landmarkIndex]) !== concatib(selectLandmark[0])))
    {
      setSelectLandmark([...[], cities[0]?.landmarks[landmarkIndex]])
      dispatch(setArea({area:concatib(cities[0]?.landmarks[landmarkIndex])}));
      dispatch(loadPlaces());}
    else
    {
      setSelectLandmark([])
      dispatch(loadPlaces());
    }
  }
  
  

  function concatib(obj: any) {
    let ans = "";
    for (let x in obj) {
      if (x === "_id") {
        break;
      }
      ans = ans + obj[x]; 
    }
    return ans;
  }
  
  if(!cities){return <Box/>}
  

  return (
    <Box
      sx={{
        "@media (min-width: 2400px)": {
          maxWidth: "90%",
          margin: "auto",
        },
        "@media (min-width: 2600px)": {
          maxWidth: "80%",
          margin: "auto",
        },
      }}
      className="locationCarousel"
      margin={{ xs: "0px 0.313rem", sm: "0" }}
    >
      <Grid
        container
        paddingLeft={{xs:'10px', sm:'0',md:'0'}}
        height={{ xl: "100px", xs: "80px" }}
        alignItems="center"
        className="locationContainer"
        // borderBottom={{sm:'none',xs:'1px solid #E1E1E1'}}
      >
        <CssBaseline />
        <Grid item xl={1.5} md={1.5} sm={1.5} xs={2.3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={{ sm: ".5", xl: "2rem" }}
            marginTop={{
              xl: "0px",
              md: "0px",
              sm: "0px",
              xs: "-2rem",
            }}
          >
            {cities?.length > 4 && (
              <Box
                width={{ sm: "32px", xs: "20px" }}
                height={{ sm: "32px", xs: "20px" }}
                borderRadius="50%"
                border="1px solid black"
                display={{ xl: "flex", md: "flex", sm: "none", xs: "flex" }}
                justifyContent="center"
                alignItems="center"
                sx={{ cursor: "pointer", background: "#FFFFFF" }}
                onClick={prev}
                marginBottom={{md:'26px', lg:'26px'}}
              >
                <NavigateBeforeIcon
                  sx={{ "@media (max-width: 600px)": { fontSize: "0.875rem" } }}
                />
              </Box>
            )}

            <Box
              //marginLeft='1rem'
              height={{ xl: "100%", md: "100%", sm: "100%", xs: "100%" }}
              display={{ xl: "flex", md: "flex", sm: "none", xs: "flex" }}
              flexDirection="column"
              justifyContent={{ sm: "center", xs: "flex-start" }}
              alignItems="center"
              gap={{xs:'8px',md:'8.8px'}}
              position="relative"
              onClick={() => Selection()}
              className={selected ? "nearme selected" : "nearme"}
              paddingBottom='8px'
            >
              <Box
                height={{ xl: "100%", md: "100%", sm: "100%", xs: "61%" }}
                sx={{
                  aspectRatio: "1",
                  background: "#8F7EF3",
                  borderRadius: "50%",
				         //'&:hover':{xs:{transform:'scale(1.2)'}}
                }}
                padding={{ md:'0.3rem', xs:'0.42rem'}}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <NearMeIcon
                  sx={{
                    color: "white",
                    fontSize: "2rem",
                    "@media (max-width: 600px)": { fontSize: "1.125rem" },
                  }}
                />
              </Box>
              <Box
                fontSize={{ sm: "0.8vw", xs: "0.625rem" }}
                marginBottom={{xs:'1px',sm:'0px',md:'0px'}}
                position="relative"
                top={{ sm: "1rem", xl: "0.25rem", md: "-0.1rem", xs:'-.05rem' }}
                whiteSpace='nowrap'
                sx={{
                  cursor: "default",
                  width: { sm: "44px", md: "3.5rem" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Near Me
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xl={8}
          md={8}
          sm={9.5}
          xs={8.5}
          height={{ xl: "100%", md: "100%", sm: "100%", xs: "100%" }}
          alignItems="start"
          overflow="hidden"
        >
          <Box height="100%">
            <Slider {...settings} ref={customSlider} >
              {cities?.map((item, index) => (
                <div
                  style={{ height: "100%" }}
                  onClick={() => locationSelect(index)}
                  key={index}
                  className={index=== underline && !selected?'slick-select':''}
                >
                  <Grid
                    height={{
                      xl: "100%",
                      md: "100%",
                      sm: "100% !important",
                      xs: "95% !important",
                    }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    gap={{ xl: 1, md: 1, sm: 1, xs: 1 }}
                    paddingBottom="10px"
                  >
                  <Box
                      height={{ xl: "90%", md: "90%", sm: "100%", xs: "100%" }}
                      sx={{
                        aspectRatio: "1",
                        borderRadius: "50%",
                        overflow: "hidden", 
                      }}
                      //onClick={handleClick}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <img className="cityImage"
                        style={{ objectFit: "contain", height: "85%" }}
                        src={staticAssetPath + item.thumbnail}
                        alt="img"
                      />
                    </Box>
                    <Box
                      fontSize={{ sm: "0.8vw", xs: "0.625rem" }}
                      position="relative"
                      top="-.3rem"
                      height="auto !important"
                    >
                      {item?.name}
                    </Box>
                  </Grid>
                </div>
              ))}
            </Slider>
          </Box>
        </Grid>
        <Grid
          item
          xl={2.5}
          md={2.5}
          sm={false}
          xs={1}
          display={{ xl: "flex", md: "flex", sm: "none", xs: "flex" }}
          justifyContent="space-evenly"
          alignItems="center"
          position="relative"
          top={{ xs: "-15px", sm: "0px" }}
          marginBottom={{md:'26px', lg:'26px'}}
        >
          {cities?.length > 4 && (
            <Box
              width={{ sm: "32px", xs: "20px" }}
              height={{ sm: "32px", xs: "20px" }}
              borderRadius="50%"
              border="1px solid black"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ cursor: "pointer", background: "#FFFFFF" }}
              onClick={next}
            >
              <NavigateNextIcon
                sx={{ "@media (max-width: 600px)": { fontSize: "0.875rem" } }}
              />
            </Box>
          )}
          <Box
            width={{ xl: "50%", md: "40%", sm: "70%", xs: "80%" }}
            display={{ sm: "none", md: "block", xs: "none" }}
          >
            <Button
              variant="outlined"
              onClick={onClick}
              style={{
                borderColor: "black",
                color: "black",
                height: "2.5rem",
                width: "100%",
                minWidth: "max-content",
                borderWidth: "0.5px",
              }}
            >
              <img
                style={{ marginRight: "0.813rem", height: "1rem" }}
                src="/assets/images/main/setting.svg"
                alt=""
              />
              <Box
                fontSize={{ xl: "0.875rem", md: "0.813rem", sm: "0.688rem" }}
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "600",
                  lineHeight: "17px",
                }}
              >
                Filter By
              </Box>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box
        marginTop={{ sm: "0.5rem" }}
        sx={{ position: "relative", top: "-.8rem" }}
      >
        <Divider />
      </Box>

      {!selected && (
        <Box display="flex" gap={1} marginLeft='1.25rem' marginRight='1.25rem' marginBottom={{xs:'12px', sm:'0'}} paddingBottom={{xs:'12px', sm:'0'}} overflow='auto'>
          {cityData ?
            cityData?.landmarks.map((landmark, landmarkIndex) => (
              <Item
                style={{
                  whiteSpace:'nowrap',
                  cursor: "pointer",
                  border: selectLandmark.includes(
                    cityData?.landmarks[landmarkIndex]
                  )
                    ? "1px solid " +
                      ["#8F7EF3", "#AD6800", "#2B941C"][landmarkIndex % 3]
                    : "",
                }}
                sx={{
                  color: ["#6053AE", "#AD6800", "#2B941C"][landmarkIndex % 3],
                  background: ["#F0EDFF", "#F2F0DF", "#ECFFEA"][
                    landmarkIndex % 3
                  ],
                  "&:hover": {
                    border:
                      "1px solid " +
                      ["#8F7EF3", "#AD6800", "#2B941C"][landmarkIndex % 3],
                  },
                }}
                key={landmarkIndex}
                onClick={() =>
                  //landmarkSelect(landmark as string, landmarkIndex)
                 { 
                  selectionLandmark(landmarkIndex);
                }}
              >
                {concatib(landmark)}
              </Item>
            )):cities[0]?.landmarks.map((landmark, landmarkIndex) => (
              <Item
                style={{
                  whiteSpace:'nowrap',
                  cursor: "pointer",
                  border: selectLandmark.includes(
                    cities[0]?.landmarks[landmarkIndex]
                  )
                    ? "1px solid " +
                      ["#8F7EF3", "#AD6800", "#2B941C"][landmarkIndex % 3]
                    : "",
                }}
                sx={{
                  color: ["#6053AE", "#AD6800", "#2B941C"][landmarkIndex % 3],
                  background: ["#F0EDFF", "#F2F0DF", "#ECFFEA"][
                    landmarkIndex % 3
                  ],
                  "&:hover": {
                    border:
                      "1px solid " +
                      ["#8F7EF3", "#AD6800", "#2B941C"][landmarkIndex % 3],
                  },
                }}
                key={landmarkIndex}
                onClick={() =>
                  //landmarkSelect(landmark as string, landmarkIndex)
                 { 
                  selectionLandmarkInitial(landmarkIndex);
                }}
              >
                {concatib(landmark)}
              </Item>
            ))}
        </Box>
      )}
      {commingSoon && <Box display={{ md: "none", xs: "flex" }} justifyContent="flex-end">
        <Box
          width={{ sm: "70%" }}
          display={{ sm: "none", md: "none", xs: "flex" }}
          height="6px"
        >
          <Button
            onClick={onClick}
            variant="outlined"
            style={{
              borderColor: "black",
              color: "black",
              height: "2rem",
              width: "60%",
              minWidth: "max-content",
              //paddingLeft: '2.7rem',
              //paddingRight: '2.7rem',
              //marginTop: '1rem',
              borderRadius: "6px",
              marginRight: "2rem",
            }}
          >
            <Box
              height="30px"
              width="fit-content"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img
                style={{ marginRight: "0.625rem", height: "40%" }}
                src="/assets/images/main/setting.svg"
                alt=""
              />
            </Box>
            <Box
              fontSize={{ xs: "0.831rem", sm: "0.688rem" }}
              sx={{
                textTransform: "capitalize",
                lineHeight: "9.75px",
              }}
            >
              Filter By
            </Box>
          </Button>
        </Box>
      </Box>}
    </Box>
  );
};

export default LocationCarousel;

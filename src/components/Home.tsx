import React, { useState, useEffect, Fragment } from "react";
import {
  MDBRadio,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
  MDBBtnGroup,
  MDBTypography,
  MDBInput,
  MDBCardText,
} from "mdb-react-ui-kit";
import { NavigateFunction, useNavigate } from 'react-router-dom';

import {
  addCardItem,
  getAllCategories,
  getAllProductItems,
  getAllProviders,
} from "../services/store.service";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
import { getCurrentUser } from "../services/auth.service";
import { Button } from "react-bootstrap";
type Item = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  garantia: string;
  category: string;
  provider: string;
};
type Category = {
  category: string;
};
type Provider = {
  provider:string;
}
const Home: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();
  const [products, setProduct] = useState<Item[]>();
  const [categories, setCategory] = useState<Category[]>();
  const [providers, setProvider] = useState<Provider[]>();
  const [choseProvider, setChoseProvider] = useState<string>("All");
  const [choseCategory, setChoseCategory] = useState<string>("All");
  const [cardItem, setCardItem] = useState<Item>();
  
  const addToItemCartHandler = () => {
    if (getCurrentUser()) {
      
      console.log(cardItem)
      return (event: React.MouseEvent) => {
    
      }
    }
    
    
   
    

  };

  const radioProviderHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoseProvider(event.target.value);
  };
  const radioCategoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoseCategory(event.target.value);
  };

  useEffect(() => {
    getAllProductItems().then(
      (response) => {
        setProduct(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setProduct(_content);
      }
    );
    getAllCategories().then(
      (response) => {
        setCategory(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setCategory(_content);
      }
    );
    getAllProviders().then(
      (response) => {
        setProvider(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setProvider(_content);
      }
    );
  }, []);
  function providerList() {
    if (providers) {
      return (
        <>
       
            <h5>Providers</h5>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id=""
                value="All"
                onChange={radioProviderHandler}
                
              />
              <div>All</div>

              {providers.map((item: Provider) => (
                <>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value={item.provider}
                    onChange={radioProviderHandler}
                  />
                  <div>{item.provider}</div>
                  </>
              ))}
            </div>
         
      </>
      )
    }
  }

  function categoriesList() {
    if (categories) {
      return (
        <>
          
              <h5>Categories</h5>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="All"
                  onChange={radioCategoryHandler}
                  
                />
                <div>All</div>

                {categories.map((item: Category) => (
                  <>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value={item.category}
                      onChange={radioCategoryHandler}
                    />
                    <div>{item.category}</div>
                    </>
                ))}
              </div>
        </>
      );
    }
  }
  function itemLists() {
    if (products) {
      return (
        <>
          {products.map((item: Item) =>{ 
             let indi = false
             if (choseProvider == "All"){
             
              if (choseCategory == "All"){
                  indi = true
              }else {
                  if (item.category == choseCategory){
                      indi = true
                  }        
              }
             }else {
                 if (item.provider == choseProvider){
                  
                  if (choseCategory == "All"){
                      indi = true
                  }else {
                      if (item.category == choseCategory){
                          indi = true
                      }        
                  }
                 }        
             }
             
            if (indi) {
            
            return  (
            
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom hover-overlay"
                    >
                      <MDBCardImage src={item.image} fluid className="w-100" />
                      <a href="#!">
                        <div
                          className="mask"
                          style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                        ></div>
                      </a>
                    </MDBRipple>
                  </MDBCol>
                  <MDBCol md="6">
                    <h5>{item.name}</h5>
  
                    {item.description}
                  </MDBCol>
                  <MDBCol
                    md="6"
                    lg="3"
                    className="border-sm-start-none border-start"
                  >
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">${item.price}</h4>
                    </div>
                    <h6 className="text-success">
                      Гарантия {item.garantia} месяцев
                    </h6>
                    <div className="d-flex flex-column mt-4">
                      
                      <Button variant="outline-primary" value={item.id} onClick={()=>{if (getCurrentUser!==null){addCardItem(item.id)}else{navigate("/login");window.location.reload() }}}>Add to card</Button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            )
          }
         
          
          })}
        </>
      );
    }
  }
  
  return (
    <>
      <MDBContainer>
        <MDBRow className="justify-content-center; mb-0">
        <MDBCol md="3" xl="3">
            <MDBCard className=" border rounded-3 mt-5 mb-3">
              <form>{categoriesList()}</form>
            <h2></h2>
          <form> {providerList()}</form>
         
          </MDBCard>
          </MDBCol>
          <MDBCol md="8" xl="9">
            <MDBCard className=" border rounded-3 mt-5 mb-3">
              {itemLists()}
            </MDBCard>
            </MDBCol>
          
        </MDBRow>
      </MDBContainer>
    </>
  );
 
};

export default Home;

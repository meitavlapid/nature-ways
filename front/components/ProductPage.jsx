import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";
import api from "../src/services/api";
import Loader from "./Loader";
import "../css/ProductPage.css";

function ProductPage() {
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const { isAdmin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/api/products/${id}?category=${category}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error("שגיאה בקבלת פרטי מוצר:", err.message);
        alert("המוצר לא נמצא");
        navigate(`/${category}`);
      });
  }, [id, category, navigate]);

  if (!product) return <Loader />;

  return (
    <div className="container" dir="rtl">
      <div className="product-bg">
        <div className="d-flex justify-content-between">
          <button className="btn btn-custom-back" onClick={() => navigate(-1)}>
            חזרה
          </button>
          {isAdmin && (
            <button
              className="btn"
              onClick={() =>
                navigate(`/admin/edit/${product._id}?category=${category}`)
              }
            >
              עריכת מוצר
            </button>
          )}
        </div>

        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <h2 className=" text-center">{product.name}</h2>
            <p className="lead text-muted">{product.shortDescription}</p>

            <div>
              <h5>תיאור מלא:</h5>
              <p>{product.fullDescription}</p>

              {product.mechanism?.length > 0 && (
                <>
                  <h5>מנגנון פעולה:</h5>
                  <ul>
                    {product.mechanism.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {product.activeIngredients?.length > 0 && (
                <>
                  <h5>רכיבים פעילים:</h5>
                  <ul>
                    {product.activeIngredients.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {product.instructions?.length > 0 && (
                <>
                  <h5>המלצות שימוש:</h5>
                  <ul>
                    {product.instructions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {product.suitableFor?.length > 0 && (
                <>
                  <h5>למי זה מתאים:</h5>
                  <ul>
                    {product.suitableFor.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {product.sections?.length > 0 && (
                <>
                  <h5>מידע נוסף:</h5>
                  {product.sections.map((section, i) => (
                    <div key={i} className="mb-3">
                      <h6>{section.title}</h6>
                      <ul>
                        {section.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="col ">
            <img src={product.image} alt={product.name} className="img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

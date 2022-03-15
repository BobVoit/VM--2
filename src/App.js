import './scss/index.scss';
import { useState } from "react";
import Field from "./componets/Field";
import Button from "./componets/Button";
import { 
  lagrange as tastLagrange, 
  interpolate as taskInterpolate, 
  rmsApproximation as taskRmsApproximation 
} from "./task/task";
import { 
  X, 
  Y,
  phi1, 
  phi2, 
  phi3,
} from "./common/data";
import { floor, spliteLineToString, calcPolynomByArray } from "./common/commonModule";
import Chart from "./componets/Chart";

function App() {
  const [fullName, setFullName] = useState("ДаниловВладимирАлександрович");
  const [name, setName] = useState("Владимир");
  const [firstName, setFirstName] = useState("Данилов");
  const [lagrangeValue, setLagrangeValue] = useState("");
  const [splineValue, setSplineValue] = useState([]);
  const [rmsApproximationValue, setRmsApproximationValue] = useState("");
  const [graphData, setGraphData] = useState([]);
  // const [graphDataLagrange, setGraphDataLagrange] = useState


  const lagrange = () => {

    const n = fullName.length;
    const m = firstName.length;
    const k = name.length;

    const x = [...X];

    const y = Y.map(func => func(n, k, m));

    const systemOfPolynom = tastLagrange(x, y);

    systemOfPolynom.forEach(element => floor(element, 100));

    console.log(systemOfPolynom);
    let polynomialString = "";
    for (let i = 0; i < systemOfPolynom.length; i++) {
        if (i === 0) {
            if (systemOfPolynom[i] < 0) {
                polynomialString += " - " + Math.abs(Math.floor(systemOfPolynom[i] * 1000) / 1000);    
            } else if (systemOfPolynom[i] > 0) {
                polynomialString += Math.floor(systemOfPolynom[i] * 1000) / 1000;    
            }
        } else {
            if (systemOfPolynom[i] < 0) {
                polynomialString += " - " + Math.abs(Math.floor(systemOfPolynom[i] * 1000) / 1000);    
            } else if (systemOfPolynom[i] > 0) {
                polynomialString += " + " + Math.floor(systemOfPolynom[i] * 1000) / 1000;    
            }  
        }
        polynomialString += "x^" + i;
    }
    setLagrangeValue(polynomialString);
    // console.log(polynomialString);

    

  }

  const spline = () => {
    const n = fullName.length;
    const m = firstName.length;
    const k = name.length;

    const x = [...X];

    const y = Y.map(func => func(n, k, m));

    const splineResult = taskInterpolate(x, y);

    const length = splineResult.a.length;

    const splineArrayText = [];
    for (let i = 0; i < length; i++) {
      splineArrayText.push(spliteLineToString(floor(x[i], 100), splineResult.a[i], splineResult.b[i], splineResult.c[i]));
    }

    setSplineValue(splineArrayText);

     
  }

  const rmsApproximation = () => {
    const n = fullName.replace(/\s/g, '').length;
    const m = firstName.length;
    const k = name.length;

    const x = [...X];

    const y = Y.map(func => func(n, k, m));

    console.log(x, y, phi1);

    let functions = null;

    if (n === 3 * k) {
      functions = phi1;
    } else if (n === 3 * k + 1) {
      functions = phi2;
    } else if (n === 3 * k + 2) {
      functions = phi3;
    } else {
      functions = phi1;
    }

    // const x = [-1, -0.5, 0, 0.5, 1];
    // const y = [];

    // for (let i = 0; i < x.length; i++) {
    //     y.push(Math.exp(x[i]));
    // }

    // const functions = [
    //     x => 1,
    //     x => x,
    //     x => x * x
    // ];

    const result = taskRmsApproximation(functions, x, y, x.length);

    let polynomialString = "";
    for (let i = 0; i < result.length; i++) {
      if (i === 0) {
        if (result[i] < 0) {
          polynomialString += " - " + Math.abs(Math.floor(result[i] * 1000) / 1000);    
        } else if (result[i] > 0) {
          polynomialString += Math.floor(result[i] * 1000) / 1000;    
        }
      } else {
        if (result[i] < 0) {
          polynomialString += " - " + Math.abs(Math.floor(result[i] * 1000) / 1000);    
        } else if (result[i] > 0) {
          polynomialString += " + " + Math.floor(result[i] * 1000) / 1000;    
        }  
      }
      polynomialString += "x^" + i;
    }

    setRmsApproximationValue(polynomialString);
    
    console.log(result);
    const data = [];
    
    for (let i = 0; i < x.length; i++) {
      data.push({
        x: x[i],
        y: y[i],
        phi: calcPolynomByArray(result, x[i])
      });
    }

    setGraphData(data);

  }

  return (
    <div className="wrapper">
      <div className="elements">
        <Field 
          value={fullName} 
          setValue={setFullName} 
          labelName="Ф.И.О." 
          elementName="fullName"
        />  
        <Field 
          value={firstName} 
          setValue={setFirstName} 
          labelName="Фамилия" 
          elementName="firstName"
        />  
        <Field 
          value={name} 
          setValue={setName} 
          labelName="Имя" 
          elementName="name"
        />  
        <div className="wrapper__button">
          <Button
            onClick={() => {
              lagrange();
              spline();
              rmsApproximation();
            }}
            text="Вычислить"
          />
        </div>
      </div>
      <div className="result"> 
        <div className="result__item result__lagrange">
          <div className="result__label">Лагранж:</div>
          <div className="result__value">{lagrangeValue}</div>
          {/* <div className="result__chart">
            <Chart 
              data={graphDataLagrange}
            />
          </div> */}
        </div>
        <div className="result__item result__lagrange">
          <div className="result__label">Сплайн:</div>
          <ul className="result__value">
            {splineValue.map((element, id) => <li key={id} className="result__value-item">{element}</li>)}
          </ul>
        </div>
        <div className="result__item result__lagrange">
          <div className="result__label">Средне квадратичное приближение:</div>
          <div className="result__value">{rmsApproximationValue}</div>
          <div className="result__chart">
            <Chart 
              data={graphData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

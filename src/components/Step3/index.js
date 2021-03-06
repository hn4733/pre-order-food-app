import React, { Fragment } from "react";
import {
  Flex,
  AddRemoveButtons,
  SelectDishWrapper,
  SelectInnerWrapper
} from "./Style";
import { Select } from "../Universal/Style";

const Step3 = ({
  data,
  currentStep,
  dish,
  mealType,
  selectRestaurant,
  updateDishState,
  addAnotherDish,
  removeDish,
  dishError
}) => {
  if (currentStep === 3) {
    const filteredData = data.filter((dataInfo, i) => {
      return (
        dataInfo.restaurant === selectRestaurant &&
        dataInfo.availableMeals.includes(mealType)
      );
    });
    const selectServingsOptions = Array.from({ length: 10 });
    const dishChecker = dish.some(dishInfo => {
      return dishInfo.dishName === "Please select a dish";
    });
    let addAnother = true;

    return (
      <Fragment>
        <h2>Dish Selection</h2>

        {dish.map((dishObject, i) => {
          if (i === filteredData.length - 1) addAnother = false;
          return (
            <Fragment key={i}>
              <div className="dish-number">#{i + 1}</div>
              <SelectDishWrapper>
                <SelectInnerWrapper>
                  <h4>Please select a dish</h4>
                  <Select
                    name="dishName"
                    value={dishObject.dishName}
                    onChange={e => updateDishState(e, i)}
                  >
                    <option disabled value="Please select a dish">
                      Please select a dish
                    </option>
                    {filteredData
                      .filter((filterElement, index) =>
                        i > 0
                          ? !dish
                              .map((v, di) => di < i && v.dishName)
                              .includes(filterElement.name)
                          : filterElement
                      )
                      .map((dishInfo, filteredIndex) => (
                        <option key={filteredIndex} value={dishInfo.name}>
                          {dishInfo.name}
                        </option>
                      ))}
                  </Select>

                  <h4>Select number of serving(s)</h4>
                  <Select
                    className="numberInput"
                    name="servings"
                    value={dishObject.servings}
                    onChange={e => updateDishState(e, i)}
                  >
                    {selectServingsOptions.map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Select>
                </SelectInnerWrapper>
                {dish.length > 1 && (
                  <Flex>
                    <AddRemoveButtons
                      className="buttons"
                      remove
                      onClick={() => removeDish(i)}
                    >
                      Remove dish
                    </AddRemoveButtons>
                  </Flex>
                )}
              </SelectDishWrapper>
            </Fragment>
          );
        })}
        {addAnother && !dishChecker && (
          <Flex>
            <AddRemoveButtons
              className="buttons"
              onClick={() => addAnotherDish()}
            >
              Add another dish
            </AddRemoveButtons>
          </Flex>
        )}
        {dishError.length > 0 && (
          <p className="notification-error">{dishError}</p>
        )}
      </Fragment>
    );
  }
  return "";
};

export default Step3;

import React, {useState, useEffect} from 'react';
import moment from "moment";

const CountingTime = ({currentProject, setPercentCollected}) => {
    const [deysLeft, setDaysLeft] = useState(null);
    const [hourLeft, setHourLeft] = useState(null);
    const [minutsLeft, setMinutsLeft] = useState(null);
    const [secondLeft, setSecondLeft] = useState(null);
    console.log('WORK!!!!');

    useEffect(() => {
        try {
          if (
            currentProject &&
            currentProject?.period &&
            currentProject?.period?.startDate
            // currentProject?.period?.countDays
          ) {
            const endDate = new Date(currentProject.period.endDate);
            // endDate.setDate(endDate.getDate() + currentProject.period.countDays);
            // let newTime = endDate.setDate(endDate.getDate() + 5);
            console.log('endDate',endDate);
      
            const timerInterval = setInterval(() => {
              const currentDate = new Date();
              const timeDifference = endDate - currentDate;
              console.log('timeDifference',timeDifference);
      
              if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                  (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                  (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      
                const formattedDays = days.toString().padStart(2, "0");
                const formattedHours = hours.toString().padStart(2, "0");
                const formattedMinutes = minutes.toString().padStart(2, "0");
                const formattedSeconds = seconds.toString().padStart(2, "0");

                setDaysLeft(formattedDays);
                setHourLeft(formattedHours);
                setMinutsLeft(formattedMinutes);
                setSecondLeft(formattedSeconds);
              } else {
                clearInterval(timerInterval);
                setDaysLeft('00');
                setHourLeft('00');
                setMinutsLeft('00');
                setSecondLeft('00');
              }
            }, 1000);
      
            return () => {
              clearInterval(timerInterval);
            };
          }
        } catch(error) {
          console.log(error);
        }
      }, [currentProject]);

      useEffect(() => {
        try {
          if (currentProject) {
            const collected = currentProject.amountCollected;
            const target = currentProject.target;
            const percent = (collected / target) * 100;
            setPercentCollected(percent);
          }
        } catch(error) {
          console.log(error);
        }
      }, [currentProject]);
    
      // useEffect(() => {
      //   try {
      //     if (currentProject) {
      //       function calculateTimeDifference(startDate, days) {
      //         const currentDate = moment().utcOffset(3);
      //         const futureDate = moment(startDate).add(days, "days");
      
      //         const timeDifference = futureDate.diff(currentDate);
      
      //         const remainingDays = Math.floor(
      //           timeDifference / (1000 * 60 * 60 * 24)
      //         );
      //         console.log('remainingDays',remainingDays);
      //         const remainingHours = Math.floor(
      //           (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      //         );
      //         console.log('remainingHours',remainingHours);
      //         const remainingMinutes = Math.floor(
      //           (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      //         );
      //         console.log('remainingMinutes',remainingMinutes);
      
      //         return {
      //           days: remainingDays,
      //           hours: remainingHours,
      //           minutes: remainingMinutes,
      //         };
      //       }
      
      //       // Приклад використання
      //       const startDate = currentProject?.period?.startDate;
      
      //       const daysToAdd = currentProject?.period?.countDays;
      
      //       const remainingTime = calculateTimeDifference(startDate, daysToAdd);
      //       if (!!startDate) {
      //         setTimeLeft(
      //           `${remainingTime.days} days, ${remainingTime.hours} hours, ${remainingTime.minutes} minutes`
      //         );
      //       } else {
      //         setTimeLeft("0");
      //       }
      //     }
      //   } catch(error) {
      //     console.log(error);
      //   }
      // }, [currentProject]);

    return (
        <div className="timer_wraper">
        <div className="timer_item">
          <p className="item_number">{deysLeft} :</p>
          <p className="item_text">Days</p>
        </div>
        <div className="timer_item">
          <p className="item_number">{hourLeft} :</p>
          <p className="item_text">Hours</p>
        </div>
        <div className="timer_item">
          <p className="item_number">{minutsLeft} :</p>
          <p className="item_text">Minutes</p>
        </div>
        <div className="timer_item">
          <p className="item_number">{secondLeft} </p>
          <p className="item_text">Second</p>
        </div>
      </div>
    );
};

export default CountingTime;
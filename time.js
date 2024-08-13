document.getElementById("miningSwitch").addEventListener("change", function() {
            if (this.checked) {
                startCountdown(9, 51); // 9 hours and 51 minutes
            } else {
                stopCountdown();
            }
        });

        let countdownInterval;

        function startCountdown(hours, minutes) {
            let endTime = new Date();
            endTime.setHours(endTime.getHours() + hours);
            endTime.setMinutes(endTime.getMinutes() + minutes);

            countdownInterval = setInterval(function() {
                let now = new Date().getTime();
                let distance = endTime - now;

                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

                document.getElementById("timeDisplay").textContent = `${hours}H:${minutes}M`;

                if (distance < 0) {
                    clearInterval(countdownInterval);
                    document.getElementById("timeDisplay").textContent = "00H:00M";
                }
            }, 1000);
        }

        function stopCountdown() {
            clearInterval(countdownInterval);
            document.getElementById("timeDisplay").textContent = "09H:51M"; // Reset to initial time
        }
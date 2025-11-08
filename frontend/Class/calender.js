document.addEventListener("DOMContentLoaded", function() {
  const testDateInput = document.getElementById("testDate");
  const formattedDisplay = document.getElementById("formattedDate");

  testDateInput.addEventListener("change", function() {
    const date = new Date(this.value);
    if (!isNaN(date)) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      formattedDisplay.textContent = `Selected Date: ${day}/${month}/${year}`;
    }
  });
});








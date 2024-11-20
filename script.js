document.addEventListener("DOMContentLoaded", () => {
  const membershipSelect = document.getElementById("membership");
  const lockerInput = document.getElementById("locker");
  const uniformInput = document.getElementById("uniform");
  const reviewEventSelect = document.getElementById("review-event");
  const totalElement = document.getElementById("total");
  const totalWithTaxElement = document.getElementById("total-with-tax");

  const membershipTable = document.getElementById("membership-table");
  const addMembershipBtn = document.getElementById("add-membership-btn");
  const addMembershipName = document.getElementById("add-membership-name");
  const addMembershipPrice = document.getElementById("add-membership-price");

  const PASSWORD = "beargym11!"; // 비밀번호 설정

  let memberships = [
    { name: "일반 1개월", price: 100000 },
    { name: "일반 3개월", price: 220000 },
    { name: "일반 6개월", price: 310000 },
    { name: "일반 12개월", price: 430000 },
    { name: "학생 1개월", price: 89000 },
    { name: "학생 3개월", price: 199000 },
    { name: "학생 6개월", price: 280000 },
    { name: "학생 12개월", price: 400000 },
  ];

  function updateMembershipOptions() {
    membershipSelect.innerHTML = "";
    memberships.forEach((membership, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = membership.name;
      membershipSelect.appendChild(option);
    });
  }

  function updateMembershipTable() {
    membershipTable.innerHTML = "";
    memberships.forEach((membership, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${membership.name}</td>
        <td>${membership.price.toLocaleString()}원</td>
        <td><button class="delete-button" onclick="deleteMembership(${index})">삭제</button></td>
      `;
      membershipTable.appendChild(row);
    });
  }

  window.deleteMembership = function (index) {
    memberships.splice(index, 1);
    updateMembershipOptions();
    updateMembershipTable();
  };

  addMembershipBtn.addEventListener("click", () => {
    const name = addMembershipName.value.trim();
    const price = parseInt(addMembershipPrice.value, 10);

    if (name && !isNaN(price) && price > 0) {
      memberships.push({ name, price });
      addMembershipName.value = "";
      addMembershipPrice.value = "";
      updateMembershipOptions();
      updateMembershipTable();
    } else {
      alert("회원권 이름과 가격을 올바르게 입력하세요.");
    }
  });

  function calculateTotal() {
    const membershipIndex = parseInt(membershipSelect.value, 10);
    const lockerMonths = parseInt(lockerInput.value, 10);
    const uniformMonths = parseInt(uniformInput.value, 10);
    const isReviewApplied = reviewEventSelect.value === "true";

    if (isNaN(membershipIndex) || membershipIndex < 0) return;

    const membershipPrice = memberships[membershipIndex].price;
    const lockerPrice = lockerMonths > 0 ? lockerMonths * 10000 : 0;
    const uniformPrice = uniformMonths > 0 ? uniformMonths * 10000 : 0;

    const discountedMembershipPrice = isReviewApplied
      ? Math.max(membershipPrice - 10000, 0)
      : membershipPrice;

    const total = discountedMembershipPrice + lockerPrice + uniformPrice;
    const totalWithTax = Math.round(total * 1.1);

    totalElement.textContent = `${total.toLocaleString()}원`;
    totalWithTaxElement.textContent = `${totalWithTax.toLocaleString()}원`;
  }

  membershipSelect.addEventListener("change", calculateTotal);
  lockerInput.addEventListener("input", calculateTotal);
  uniformInput.addEventListener("input", calculateTotal);
  reviewEventSelect.addEventListener("change", calculateTotal);

  function toggleMembershipManagement() {
    const section = document.getElementById("membership-management-section");
    section.style.display = section.style.display === "none" ? "block" : "none";
  }

  window.promptForPassword = function () {
    const userPassword = prompt("비밀번호를 입력하세요:");
    if (userPassword === PASSWORD) {
      toggleMembershipManagement();
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  updateMembershipOptions();
  updateMembershipTable();
  calculateTotal();
});
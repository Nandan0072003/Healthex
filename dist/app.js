const web3 = new Web3("https://goerli.infura.io/v3/1943d3a9e3bd4d8997e5fa50730ff537");
const contractAddress = "0x2305fb6f1F15b9eAFEC09f2B4beed4CC17a2Dc8B";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symptoms",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "assumptions",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "prescription",
        "type": "string"
      }
    ],
    "name": "addReport",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "UserId",
        "type": "string"
      }
    ],
    "name": "getReports",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "symptoms",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "assumptions",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "prescription",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const contract = new web3.eth.Contract(contractABI, contractAddress);

const addReportToBlockchain = async () => {
  const patientId = document.getElementById('UserId').value;
  const symptoms = document.getElementById('symptoms').value;
  const assumptions = document.getElementById('assumptions').value;
  const prescription = document.getElementById('prescription').value;

  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];

  const result = await contract.methods.addReport(patientId, symptoms, assumptions, prescription).send({ from });
  console.log(result);
  loadReportsFromBlockchain();
};

const loadReportsFromBlockchain = async () => {
  const patientId = document.getElementById('UserId').value;
  const result = await contract.methods.getReports(patientId).call();

  const tbody = document.getElementById('reports-tbody');
  tbody.innerHTML = '';

  for (let i = 0; i < result[0].length; i++) {
    const row = tbody.insertRow();
    const symptomsCell = row.insertCell();
    const assumptionsCell = row.insertCell();
    const prescriptionCell = row.insertCell();
    symptomsCell.innerHTML = result[0][i];
    assumptionsCell.innerHTML = result[1][i];
    prescriptionCell.innerHTML = result[2][i];
  }
};
//const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/YOUR_PROJECT_ID'));

//const contract = new web3.eth.Contract(ABI, 'YOUR_CONTRACT_ADDRESS');

const addReport = async () => {
  const patientId = document.getElementById('patient-id').value;
  const symptoms = document.getElementById('symptoms').value;
  const assumptions = document.getElementById('assumptions').value;
  const prescription = document.getElementById('prescription').value;

  await contract.methods.addReport(patientId, symptoms, assumptions, prescription).send({from: web3.eth.defaultAccount});
  loadReports();
};

const loadReports = async () => {
  const patientId = document.getElementById('patient-id').value;
  const result = await contract.methods.getReports(patientId).call();

  const tbody = document.getElementById('reports-tbody');
  tbody.innerHTML = '';

  for (let i = 0; i < result[0].length; i++) {
    const row = tbody.insertRow();
    const symptomsCell = row.insertCell();
    const assumptionsCell = row.insertCell();
    const prescriptionCell = row.insertCell();
    symptomsCell.innerHTML = result[0][i];
    assumptionsCell.innerHTML = result[1][i];
    prescriptionCell.innerHTML = result[2][i];
  }
};

document.getElementById('add-report-btn').addEventListener('click', addReport);
document.getElementById('patient-id').addEventListener('change', loadReports);

web3.eth.getAccounts().then((accounts) => {
  web3.eth.defaultAccount = accounts[0];
  loadReports();
});



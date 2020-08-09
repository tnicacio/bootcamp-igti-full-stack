import React, { Component } from 'react';
import InputFullSalary from '../inputs/InputFullSalary';
import InputReadOnly from '../inputs/InputReadOnly';
import ProgressBarSalary from '../salaryBar/ProgressBarSalary';
import { getSalaryData } from '../../helpers/SalaryCalculation';
import css from './projeto.module.css';

export default class ProjetoBase extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 0,
      salaryData: {
        baseINSS: 0,
        discountINSS: 0,
        discountINSSPercentage: 0,
        baseIRPF: 0,
        discountIRPF: 0,
        discountIRPFPercentage: 0,
        liquidSalary: 0,
        liquidSalaryPercentage: 0,
      },
    };
  }

  handleChangeSalary = (newSalary) => {
    this.setState({
      fullSalary: newSalary,
      salaryData: getSalaryData(newSalary),
    });
  };

  componentDidUpdate() {}

  render() {
    const { fullSalary, salaryData } = this.state;
    const {
      baseINSS,
      discountINSS,
      discountINSSPercentage,
      baseIRPF,
      discountIRPF,
      discountIRPFPercentage,
      liquidSalary,
      liquidSalaryPercentage,
    } = salaryData;

    return (
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>React Salary</h1>
        <div>
          <InputFullSalary
            description="Salário Bruto"
            fullSalary={fullSalary}
            onChangeSalary={this.handleChangeSalary}
          />
        </div>

        <div className={css.flexRow}>
          <InputReadOnly description="Base INSS:" value={baseINSS} />
          <InputReadOnly
            description="Desconto INSS:"
            value={discountINSS}
            percentage={discountINSSPercentage}
            color="#e67e22"
          />
          <InputReadOnly description="Base IRPF:" value={baseIRPF} />
          <InputReadOnly
            description="Desconto IRPF:"
            value={discountIRPF}
            percentage={discountIRPFPercentage}
            color="#c0392b"
          />
        </div>

        <div>
          <InputReadOnly
            description="Salário Líquido"
            value={liquidSalary}
            percentage={liquidSalaryPercentage}
            color="#16a085"
          />
        </div>

        <div className={css.flexRow}>
          <ProgressBarSalary value={discountINSSPercentage} color="#e67e22" />
          <ProgressBarSalary value={discountIRPFPercentage} color="#c0392b" />
          <ProgressBarSalary value={liquidSalaryPercentage} color="#16a085" />
        </div>
      </div>
    );
  }
}

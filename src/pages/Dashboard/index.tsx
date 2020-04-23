import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';
import Header from '../../components/Header';
import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface APIResponse {
  transactions: {
    id: string;
    title: string;
    value: number;
    type: 'income' | 'outcome';
    category: { title: string };
    created_at: string;
  }[];

  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

interface Transaction {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: string;

  formattedValue: string;
  formattedDate: string;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactios, setTransactios] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function fetchAPIInformation(): Promise<void> {
      const response = await api.get<APIResponse>('/transactions');

      const newTransactions = response.data.transactions.map(
        (t): Transaction => {
          const parsedDate = parseISO(t.created_at);
          const formattedDate = format(parsedDate, 'dd/MM/yyyy');
          const formattedValue = formatValue(t.value);

          return { ...t, formattedValue, formattedDate };
        },
      );

      setTransactios(newTransactions);
      setBalance({
        income: formatValue(response.data.balance.income),
        outcome: formatValue(response.data.balance.outcome),
        total: formatValue(response.data.balance.total),
      });
    }

    fetchAPIInformation();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactios.map((t) => (
                <tr key={t.id}>
                  <td className="title">{t.title}</td>
                  <td className={t.type}>
                    {t.type === 'outcome' && '-'} {t.formattedValue}
                  </td>
                  <td>{t.category.title}</td>
                  <td>{t.formattedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;

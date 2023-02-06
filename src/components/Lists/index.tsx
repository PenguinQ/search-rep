/** @jsxImportSource @emotion/react */
import EmptyState from '../EmptyState';
import { Container } from './styles';

interface ErrorResponseHeaderstype {
  'x-ratelimit-remaining': string;
  'x-ratelimit-reset': string;
}

interface ErrorResponseDataType {
  message: string;
}

interface ErrorResponseType {
  data: ErrorResponseDataType;
  headers: ErrorResponseHeaderstype;
  status: number;
  statusText: string;
}

export interface ErrorType {
  response: ErrorResponseType;
}

interface ListPropsItems {
  name: string;
  html_url: string;
}

export interface ListPropsData {
  total_count: number;
  items: ListPropsItems[];
  incomplete_results: boolean;
}

export interface ListsProps {
  data: ListPropsData | null;
  error: ErrorType | null;
  loading: boolean;
}

const Lists = (props: ListsProps) => {
  const { data, error, loading } = props;

  const getLocalTime = (epoch: string) => {
    return new Date(parseInt(epoch, 10) * 1000).toString();
  };

  if (loading) {
    return <EmptyState title="Searching..." />;
  }

  if (error) {
    const { response } = error;
    const { data, status, statusText, headers } = response;
    const limitRemaining = headers['x-ratelimit-remaining'];
    const limitReset = headers['x-ratelimit-reset'];

    switch (status) {
      case 403:
        if (limitRemaining === '0') {
          const time = getLocalTime(limitReset);

          return (
            <EmptyState
              title="Limit exceeded 😅"
              subtitle={`Please try again at ${time}`}
            />
          );
        }
        break;
      case 422:
        if (statusText === "Unprocessable Entity") {
          return <EmptyState title="Umm... 😅" subtitle={data.message} />;
        }
        break;
      default:
        return (
          <EmptyState
            title="Umm... 😅"
            subtitle="Looks like there's some issue, please try again later."
          />
        );
    }
  }

  return data && data.total_count ? (
    <>
      {data.items.map((item, index) => {
        const { name, html_url } = item;

        return (
          <a key={index} css={Container} href={html_url}>
            <span>{name}</span>
          </a>
        );
      })}
    </>
  ) : (
    <EmptyState
      title="Umm... 😅"
      subtitle="No repositories found with that name."
    />
  );
};

export default Lists;

import { getTasksService } from './getTasksService';
import { baseRequest } from './baseRequest';
import type { IDeskproClient } from '@deskpro/app-sdk';
import type { Project, Task } from './types';
import type { NextPage } from '@/types';

jest.mock('./baseRequest');

const mockedBaseRequest = baseRequest as jest.MockedFunction<typeof baseRequest>;

describe('getTasksService', () => {
  const mockClient = {} as IDeskproClient;
  const projectId = '12345' as Project["gid"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array if no projectId is provided', async () => {
    const result = await getTasksService(mockClient, '')
    expect(result).toEqual({ data: [] })
    expect(mockedBaseRequest).not.toHaveBeenCalled()
  })

  it('should successfully fetch and return tasks from a single page response', async () => {
    const tasks: Task[] = [{ gid: '1', name: 'Draft 1' } as Task]

    mockedBaseRequest.mockResolvedValueOnce({
      data: tasks,
      next_page: null,
    })

    const result = await getTasksService(mockClient, projectId)

    expect(mockedBaseRequest).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ data: tasks })
  })

  it('should successfully fetch and return tasks across multiple pages', async () => {
    const taskPage1: Task[] = [{ gid: '1', name: 'Task 1' } as Task]
    const taskPage2: Task[] = [{ gid: '2', name: 'Task 2' } as Task]

    mockedBaseRequest
      .mockResolvedValueOnce({
        data: taskPage1,
        next_page: { uri: 'https://draft.com/next-page' } as NextPage,
      })
      .mockResolvedValueOnce({
        data: taskPage2,
        next_page: null,
      })

    const result = await getTasksService(mockClient, projectId)

    expect(mockedBaseRequest).toHaveBeenCalledTimes(2)
    expect(result).toEqual({ data: [...taskPage1, ...taskPage2] })
  })

  it('should handle empty responses', async () => {
    mockedBaseRequest.mockResolvedValueOnce({
      data: [],
      next_page: null,
    })

    const result = await getTasksService(mockClient, projectId)

    expect(mockedBaseRequest).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ data: [] })
  })

  it('should handle undefined next_page correctly', async () => {
    const tasks: Task[] = [{ gid: '1', name: 'Task 1' } as Task]

    mockedBaseRequest.mockResolvedValueOnce({
      data: tasks,
    })

    const result = await getTasksService(mockClient, projectId)

    expect(mockedBaseRequest).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ data: tasks })
  })
})

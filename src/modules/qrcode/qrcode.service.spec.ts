import { Test, TestingModule } from '@nestjs/testing';
import { QrcodeService } from './qrcode.service';
import { JwtService } from '@nestjs/jwt';

describe('QrcodeService', () => {
  let service: QrcodeService;

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QrcodeService,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<QrcodeService>(QrcodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateToken', () => {
    it('should call jwtService.sign with userId and return token', () => {
      // Setup mock
      mockJwtService.sign.mockReturnValue('mocked_token');

      // Gọi **code thật của service**
      const result = service.generateToken('123');

      // Kiểm tra giá trị trả về
      expect(result).toBe('mocked_token');

      // Kiểm tra logic gọi dependency
      expect(mockJwtService.sign).toHaveBeenCalledWith({ userId: '123' });
    });
  });

  describe('verifyToken', () => {
    it('should return payload when token is valid', () => {
      const payload = { userId: '123' };
      mockJwtService.verify.mockReturnValue(payload);

      const result = service.verifyToken('token');

      expect(result).toEqual(payload);
      expect(mockJwtService.verify).toHaveBeenCalledWith('token');
    });

    it('should return null when token is invalid', () => {
      mockJwtService.verify.mockImplementation(() => {
        throw new Error('Invalid');
      });

      const result = service.verifyToken('token');

      expect(result).toBeNull();
    });
  });
});

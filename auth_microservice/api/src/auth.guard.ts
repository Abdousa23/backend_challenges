import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private reflector: Reflector, @Inject('USER_SERVICE') private client: ClientProxy) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        if (!request) {
            throw new UnauthorizedException('Request object not found');
        }

        const apiKey = this.extractApiKeyFromHeader(request);
        if (!apiKey) {
            throw new UnauthorizedException('API key not found');
        }

        const payload = await this.validateApiKey(apiKey);
        const user = await firstValueFrom(payload);
        if (!user) {
            throw new UnauthorizedException('Invalid API key');
        }
        request.user = user;
        return true;
    }

    private extractApiKeyFromHeader(request: any): string | null {
        return request.headers['x-api-key'] || null;
    }

    private async validateApiKey(apiKey: string): Promise<any> {
        return this.client.send({ cmd: 'VALIDATE_API_KEY' }, apiKey);
    }
}